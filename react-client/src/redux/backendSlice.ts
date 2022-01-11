import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GomokuPiece, GomokuCore, GomokuCoreWithAgent } from 'gomoku-core';
import type { RootState } from './store';
// import Gomoku from './gomoku/gomoku';

export interface BackendState {
  gomoku: GomokuCoreWithAgent;
  mode: 'pve' | 'pvp';
  board: GomokuPiece[][];
  winner: GomokuPiece;
}

const initialState: BackendState = {
  gomoku: new GomokuCoreWithAgent(),
  mode: 'pvp',
  board: new Array(GomokuCore.BOARD_SIZE).fill(0)
    .map(() => new Array(GomokuCore.BOARD_SIZE).fill(GomokuPiece.EMPTY)),
  winner: GomokuPiece.EMPTY,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
// export const initAsync = createAsyncThunk(
//   'wasm/init',
//   async () => {
//     const module = await createWasmModule({ noInitialRun: true, noExitRuntime: true });
//     const instance = new module.GomokuCoreWithAgent();
//     // The value we return becomes the `fulfilled` action payload
//     return {
//       module,
//       instance,
//       board: instance.get_board(),
//       winner: instance.get_winner(),
//     };
//   },
// );

export const backendSlice = createSlice({
  name: 'gomoku',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<BackendState['mode']>) => {
      state.mode = action.payload;
    },
    move: (state, action: PayloadAction<{ row: number, col: number }>) => {
      const { row, col } = action.payload;
      state.gomoku.move(row, col);
      state.board[row][col] = state.gomoku.getBoardAt(row, col);
      state.winner = state.gomoku.getWinner();
      // TODO: mode
      if (state.mode === 'pve' && state.winner === GomokuPiece.EMPTY) {
        const [r, c] = state.gomoku.counterMove();
        state.board[r][c] = state.gomoku.getBoardAt(r, c);
        state.winner = state.gomoku.getWinner();
      }
    },
    withdraw: (state) => {
      const pos = state.gomoku.withdraw();
      if (pos) state.board[pos[0]][pos[1]] = GomokuPiece.EMPTY;
      // state.board = state.gomoku.getBoard();
      state.winner = state.gomoku.getWinner();
      // TODO: mode
    },
    reset: (state) => {
      state.gomoku = new GomokuCoreWithAgent();
      state.board = new Array(GomokuCore.BOARD_SIZE).fill(0)
        .map(() => new Array(GomokuCore.BOARD_SIZE).fill(GomokuPiece.EMPTY));
      state.winner = GomokuPiece.EMPTY;
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(initAsync.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(initAsync.fulfilled, (state, action) => {
  //       state.module = action.payload.module;
  //       state.instance = action.payload.instance;
  //       state.board = action.payload.board;
  //       state.winner = action.payload.winner;
  //       state.status = 'loaded';
  //     })
  //     .addCase(initAsync.rejected, (state) => {
  //       state.status = 'failed';
  //     });
  // },
});

// export const selectGomoku = (state: RootState) => state.backend.gomoku;
export const selectMode = (state: RootState) => state.backend.mode;
// export const selectBoard = (state: RootState) => state.backend.board;
// eslint-disable-next-line max-len
export const selectPiece = (row: number, col: number) => (state: RootState) => state.backend.board[row][col];
export const selectWinner = (state: RootState) => state.backend.winner;
// export const selectStatus = (state: RootState) => state.backend.status;

export const {
  setMode, move, withdraw, reset,
} = backendSlice.actions;

export default backendSlice.reducer;
