import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import EventEmitter from 'events';
// eslint-disable-next-line
import GomokuCoreWithAgent, { Piece, Move, GomokuCore } from 'gomoku-core';
import type { AppThunk, RootState } from './store';

export interface BackendState {
  gomoku: GomokuCoreWithAgent;
  mode: 'pve' | 'pvp';
  board: Piece[][];
  winner: Piece;
  status: 'open' | 'idle' | 'searching';
}

const initialState: BackendState = {
  gomoku: new GomokuCoreWithAgent(),
  mode: 'pvp',
  board: new Array(GomokuCore.BOARD_SIZE).fill(0)
    .map(() => new Array(GomokuCore.BOARD_SIZE).fill(Piece.EMPTY)),
  winner: Piece.EMPTY,
  status: 'open',
};

// async function worker(gomoku: GomokuCoreWithAgent) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(gomoku.search());
//     }, 0);
//   });
// }

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const selectGomoku = (state: RootState) => state.backend.gomoku;
export const searchAsync = createAsyncThunk(
  'backend/search',
  async (_args, { dispatch, getState }) => {
    // const gomoku = selectGomoku(getState() as RootState);
    console.log('searchAsync started');
    // const worker = new Worker();
    // console.log(await instance.heavyLoad(10));
    console.log('searchAsync finished');
    // worker.postMessage({ gomoku });
    // worker.onmessage = (e) => {
    //   const move = e.data as Move;
    //   console.log(move);
    // };
    // console.log('searchAsync');
    // const move = await worker(gomoku);
    // console.log('move', move);
    // return move;
    // The value we return becomes the `fulfilled` action payload
  },
);

export const backendSlice = createSlice({
  name: 'gomoku',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<'pve' | 'pvp'>) => {
      state.mode = action.payload;
    },
    move: (state, action: PayloadAction<Move>) => {
      const [row, col] = action.payload;
      state.gomoku.move(row, col);
      state.board[row][col] = state.gomoku.getBoardAt(row, col);
      state.winner = state.gomoku.getWinner();
      state.status = 'idle';
      // TODO: mode
      // if (state.mode === 'pve') {
      //   state.gomoku.search();
      //   state.status = 'searching';
      // }
    },
    withdraw: (state) => {
      const pos = state.gomoku.withdraw();
      if (pos) state.board[pos[0]][pos[1]] = Piece.EMPTY;
      if (state.gomoku.getLastMove() === null) state.status = 'open';
      state.winner = state.gomoku.getWinner();
    },
    reset: (state) => {
      state.gomoku.reset();
      state.board = new Array(GomokuCore.BOARD_SIZE).fill(0)
        .map(() => new Array(GomokuCore.BOARD_SIZE).fill(Piece.EMPTY));
      state.winner = Piece.EMPTY;
      state.status = 'open';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAsync.pending, (state) => {
        state.status = 'searching';
      })
      .addCase(searchAsync.fulfilled, (state, action) => {
        // console.log(action.payload);
        // const  = action.payload;
        // state.gomoku.move(row, col);
        // state.board[row][col] = state.gomoku.getBoardAt(row, col);
        // state.winner = state.gomoku.getWinner();
        state.status = 'idle';
      });
  },
});

export const {
  setMode, move, withdraw, reset,
} = backendSlice.actions;

export const selectMode = (state: RootState) => state.backend.mode;
// export const selectBoard = (state: RootState) => state.backend.board;
// eslint-disable-next-line max-len
export const selectPiece = (row: number, col: number) => (state: RootState) => state.backend.board[row][col];
export const selectWinner = (state: RootState) => state.backend.winner;
export const selectStatus = (state: RootState) => state.backend.status;

export default backendSlice.reducer;
