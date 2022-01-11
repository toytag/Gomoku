import { configureStore } from '@reduxjs/toolkit';
import backendReducer from './backendSlice';

export const store = configureStore({
  reducer: {
    backend: backendReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    // {
    //   ignoredActions: ['wasm/init/fulfilled', 'wasm/move'],
    //   ignoredPaths: ['wasm.*'],
    // },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
