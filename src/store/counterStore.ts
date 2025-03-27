import { Store } from '@tanstack/store';

export const counterStore = new Store({
  count: 0,
});

export const increment = () =>
  counterStore.setState((prev) => ({
    count: prev.count + 1,
  }));

export const decrement = () =>
  counterStore.setState((prev) => ({
    count: prev.count - 1,
  }));
