import { configureStore } from '@reduxjs/toolkit';
import wasmReducer, { WasmState, initAsync, setMode, move, withdraw, reset } from './wasmSlice';

describe('mode reducer', () => {
  const initialState: WasmState = {
    module: undefined,
    instance: undefined,
    mode: 'pvp',
    board: [],
    winner: undefined,
    status: 'init',
  };

  const store = configureStore({
    reducer: { wasm: wasmReducer },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });

  jest.setTimeout(30000);

  it('initialState', () => {
    expect(store.getState().wasm).toEqual(initialState);
  });

  it('initAsync', async () => {
    await store.dispatch(initAsync());
    expect(store.getState().wasm.module).toBeDefined();
    expect(store.getState().wasm.instance).toBeDefined();
    expect(store.getState().wasm.board).toBeDefined();
    expect(store.getState().wasm.winner).toBeDefined();
    expect(store.getState().wasm.status).toEqual('loaded');
  });

  it('setMode', () => {
    store.dispatch(setMode('pve'));
    expect(store.getState().wasm.mode).toEqual('pve');
    store.dispatch(setMode('pvp'));
    expect(store.getState().wasm.mode).toEqual('pvp');
  });
});
  
