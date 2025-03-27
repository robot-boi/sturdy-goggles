export default function (plop) {
  plop.setGenerator('page', {
    description: 'Generate a new page with its view and routing',

    prompts: [
      {
        type: 'input',
        name: 'pageName',
        message: 'What is the name of the new page?',
      },
    ],

    actions: [
      // Create the view.tsx file in the sections directory
      {
        type: 'add',
        path: 'src/sections/{{kebabCase pageName}}/view.tsx',
        templateFile: 'plop-templates/page-view.hbs',
      },

      // Create the index.tsx file in the pages directory
      {
        type: 'add',
        path: 'src/pages/dashboard/{{kebabCase pageName}}/index.tsx',
        templateFile: 'plop-templates/page-index.hbs',
      },

      // Inject new page import into dashboard.tsx
      {
        type: 'modify',
        path: 'src/routes/sections/dashboard.tsx',
        pattern: /(\/\* PLOP_INJECT_IMPORT \*\/)/g,
        template: `const {{pascalCase pageName}}Page = lazy(() => import('src/pages/dashboard/{{kebabCase pageName}}'));\n$1`,
      },

      // Inject new route into the routes array in dashboard.tsx
      {
        type: 'modify',
        path: 'src/routes/sections/dashboard.tsx',
        pattern: /(\/\* PLOP_INJECT_ROUTE \*\/)/g,
        template: `      { path: '{{kebabCase pageName}}', element: <{{pascalCase pageName}}Page /> },\n$1`,
      },

      // Inject new path into path.ts
      {
        type: 'modify',
        path: 'src/routes/paths.ts',
        pattern: /(\/\* PLOP_INJECT_PATH \*\/)/g, // Add a placeholder like this in your `path.ts` file
        template: `    {{camelCase pageName}}: { root: \`\${ROOTS.DASHBOARD}/{{kebabCase pageName}}\` },\n$1`,
      },
      // Inject new navigation entry into config-nav-dashboard.tsx
      {
        type: 'modify',
        path: 'src/layouts/config-nav-dashboard.tsx',
        pattern: /(\/\* PLOP_INJECT_NAV \*\/)/g, // Add a placeholder in your nav config file
        template: `      { title: '{{pascalCase pageName}}', path: paths.dashboard.{{camelCase pageName}}.root, icon: ICONS.blank },\n$1`,
      },
    ],
  });
}
