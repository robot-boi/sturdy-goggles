import type { Store } from '@tanstack/store';

import { useSyncExternalStore } from 'react';

export function useStore<T>(store: Store<T>): T {
  return useSyncExternalStore(
    store.subscribe,
    () => store.state,
    () => store.state
  );
}
