import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import backendReducer from './backendSlice';

export const store = configureStore({
  reducer: {
    backend: backendReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// eslint-disable-next-line max-len
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
