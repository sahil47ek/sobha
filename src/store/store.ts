'use client';

import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './productSlice';
import projectsReducer from './features/projectsSlice';
import leadsReducer from './features/leadsSlice';
import adminReducer from './features/adminSlice';

const projectsPersistConfig = {
  key: 'projects',
  storage,
  whitelist: ['projects'] // only projects will be persisted
};

const leadsPersistConfig = {
  key: 'leads',
  storage,
  whitelist: ['leads']
};

const adminPersistConfig = {
  key: 'admin',
  storage,
  whitelist: ['password', 'isAuthenticated']
};

// Client-side store setup
const makeStore = () => {
  const persistedProjectsReducer = persistReducer(projectsPersistConfig, projectsReducer);
  const persistedLeadsReducer = persistReducer(leadsPersistConfig, leadsReducer);
  const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);

  return configureStore({
    reducer: {
      products: productReducer,
      projects: persistedProjectsReducer,
      leads: persistedLeadsReducer,
      admin: persistedAdminReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
        },
      }),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;