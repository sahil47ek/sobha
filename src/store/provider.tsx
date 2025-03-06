'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { useEffect } from 'react';
import { initializeFromStorage } from './productSlice';

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    store.dispatch(initializeFromStorage());
  }, []);

  return <Provider store={store}>{children}</Provider>;
} 