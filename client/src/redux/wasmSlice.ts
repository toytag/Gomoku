import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from './store';
import createWasmModule from './WasmModule';

export interface WasmState {
  module: any;
  instance: any;
  mode: 'pve' | 'pvp';
  board: any[][];
  winner: any;
  status: 'init' | 'loading' | 'loaded' | 'failed';
}

const initialState: WasmState = {
  module: undefined,
  instance: undefined,
  mode: 'pvp',
  board: [],
  winner: undefined,
  status: 'init',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const initAsync = createAsyncThunk(
  'wasm/init',
  async () => {
    const module = await createWasmModule({ noInitialRun: true, noExitRuntime: true });
    const instance = new module.GomokuCoreWithAgent();
    // The value we return becomes the `fulfilled` action payload
    return {
      module,
      instance,
      board: instance.get_board(),
      winner: instance.check_winner(),
    };
  },
);

export const wasmSlice = createSlice({
  name: 'wasm',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<WasmState['mode']>) => {
      state.mode = action.payload;
    },
    move: (state, action: PayloadAction<{ row: number, col: number }>) => {
      const { row, col } = action.payload;
      state.board[row][col] = state.instance.move(row, col);
      state.winner = state.instance.check_winner();
      // TODO: mode
    },
    withdraw: (state) => {
      const [row, col] = state.instance.withdraw();
      if (row !== -1 && col !== -1) {
        state.board[row][col] = state.module.GomokuPiece.EMPTY;
      }
      state.winner = state.instance.check_winner();
      // TODO: mode
    },
    reset: (state) => {
      state.instance.delete();
      state.instance = new state.module.GomokuCoreWithAgent();
      state.board = state.instance.get_board();
      state.winner = state.instance.check_winner();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(initAsync.fulfilled, (state, action) => {
        state.module = action.payload.module;
        state.instance = action.payload.instance;
        state.board = action.payload.board;
        state.winner = action.payload.winner;
        state.status = 'loaded';
      })
      .addCase(initAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectModule = (state: RootState) => state.wasm.module;
export const selectInstance = (state: RootState) => state.wasm.instance;
export const selectMode = (state: RootState) => state.wasm.mode;
export const selectBoard = (state: RootState) => state.wasm.board;
// eslint-disable-next-line max-len
export const selectPiece = (row: number, col: number) => (state: RootState) => state.wasm.board[row][col];
export const selectWinner = (state: RootState) => state.wasm.winner;
export const selectStatus = (state: RootState) => state.wasm.status;

export const {
  setMode, move, withdraw, reset,
} = wasmSlice.actions;

export default wasmSlice.reducer;
