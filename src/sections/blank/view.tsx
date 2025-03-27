import type { Theme, SxProps } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useStore } from 'src/lib/useStore';
import { DashboardContent } from 'src/layouts/dashboard';
import { increment, decrement, counterStore } from 'src/store/counterStore';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  sx?: SxProps<Theme>;
};

export function BlankView({ title = 'Blank', sx }: Props) {
  const { count } = useStore(counterStore);

  const renderContent = () => (
    <Box
      sx={[
        (theme) => ({
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          border: `dashed 1px ${theme.vars.palette.divider}`,
          bgcolor: varAlpha(theme.vars.palette.grey['500Channel'], 0.04),
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4"> {title} </Typography>
      {/* {renderContent()} */}

      <section style={{ marginBottom: '2rem' }}>
        <h2>🧮 Counter: {count}</h2>
        <button onClick={increment} style={{ marginRight: '1rem' }}>
          ➕
        </button>
        <button onClick={decrement}>➖</button>
      </section>
    </DashboardContent>
  );
}
