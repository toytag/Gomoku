import { configureStore } from '@reduxjs/toolkit';
import wasmReducer from './wasmSlice';

export const store = configureStore({
  reducer: {
    wasm: wasmReducer,
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
