// declare module 'comlink-loader!*' {
//   import type { Piece, Move } from 'gomoku-core';

//   class WebpackWorker extends Worker {
//     constructor();

//     getBoardAt(row: number, col: number): Promise<Piece>;
//     getCurrentPlayer(): Promise<Piece>;
//     getLastMove(): Promise<Move | null>;
//     getWinner(): Promise<Piece>;
//     move(row: number, col: number): Promise<Move | null>;
//     withdraw(): Promise<Move | null>;
//     reset(): Promise<void>;
//     search(): Promise<Move | null>;
//   }

//   export default WebpackWorker;
// }
