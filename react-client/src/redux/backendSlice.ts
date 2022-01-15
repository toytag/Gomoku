/* eslint-disable max-len */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import EventEmitter from 'events';
// eslint-disable-next-line
import GomokuCoreWithAgent, { Move, Piece, Board as B } from 'gomoku-core';
import type { RootState } from './store';

import Worker from './worker';

export interface BackendState {
  worker: any;
  // gomoku: GomokuCoreWithAgent;
  mode: 'pve' | 'pvp';
  board: Piece[][];
  winner: Piece;
  status: 'idle' | 'busy';
}

const initialState: BackendState = {
  worker: Worker(),
  // gomoku: new GomokuCoreWithAgent(),
  mode: 'pve',
  board: Array(B.SIZE).fill(0).map(() => Array(B.SIZE).fill(Piece.EMPTY)),
  winner: Piece.EMPTY,
  status: 'idle',
};

// console.log('initialState', initialState.worker);

export const selectWorker = (state: RootState) => state.backend.worker;
export const selectMode = (state: RootState) => state.backend.mode;
// eslint-disable-next-line max-len
export const selectPiece = (row: number, col: number) => (state: RootState) => state.backend.board[row][col];
export const selectWinner = (state: RootState) => state.backend.winner;
export const selectStatus = (state: RootState) => state.backend.status;

export const moveAsync = createAsyncThunk(
  'backend/move',
  async (move: Move, { getState }): Promise<{ move: Move, piece: Piece, winner: Piece }> => {
    const worker = selectWorker(getState() as RootState);
    const [row, col] = move;
    await worker.move(row, col);
    const piece = await worker.getBoardAt(row, col);
    const winner = await worker.getWinner();
    return { move, piece, winner };
  },
);

export const withdrawAsync = createAsyncThunk(
  'backend/withdraw',
  async (_, { getState }): Promise<{ move: Move | null, lastMove: Move | null, winner: Piece }> => {
    const worker = selectWorker(getState() as RootState);
    const move = await worker.withdraw();
    const lastMove = await worker.getLastMove();
    const winner = await worker.getWinner();
    return { move, lastMove, winner };
  },
);

export const resetAsync = createAsyncThunk(
  'backend/reset',
  async (_, { getState }): Promise<void> => {
    const worker = selectWorker(getState() as RootState);
    await worker.reset();
  },
);

export const searchAsync = createAsyncThunk(
  'backend/search',
  async (_, { dispatch, getState }): Promise<void> => {
    const worker = selectWorker(getState() as RootState);
    const move = await worker.search();
    if (move) {
      await dispatch(moveAsync(move));
    }
  },
);

export const counterMoveAsync = createAsyncThunk(
  'backend/counterMove',
  async (_, { dispatch, getState }): Promise<void> => {
    const mode = selectMode(getState() as RootState);
    if (mode === 'pve') {
      await dispatch(searchAsync());
    }
  },
);

export const backendSlice = createSlice({
  name: 'backend',
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<'pve' | 'pvp'>) => {
      state.mode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        moveAsync.fulfilled,
        (state, action: PayloadAction<{ move: Move, piece: Piece, winner: Piece }>) => {
          const { move, piece, winner } = action.payload;
          const [row, col] = move;
          state.board[row][col] = piece;
          state.winner = winner;
          state.status = 'idle';
        },
      )
      .addCase(
        withdrawAsync.fulfilled,
        (state, action: PayloadAction<{ move: Move | null, lastMove: Move | null, winner: Piece }>) => {
          const { move, winner } = action.payload;
          if (move) {
            const [row, col] = move;
            state.board[row][col] = Piece.EMPTY;
          }
          state.winner = winner;
          state.status = 'idle';
        },
      )
      .addCase(resetAsync.fulfilled, (state) => {
        state.board = Array(B.SIZE).fill(0).map(() => Array(B.SIZE).fill(Piece.EMPTY));
        state.winner = Piece.EMPTY;
        state.status = 'idle';
      })
      .addCase(searchAsync.pending, (state) => {
        state.status = 'busy';
      })
      .addCase(searchAsync.fulfilled, (state) => {
        state.status = 'idle';
      });
  },
});

export const { setMode } = backendSlice.actions;

export default backendSlice.reducer;
