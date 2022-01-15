/* eslint-disable max-classes-per-file */
export type Move = readonly [number, number];

export enum Piece {
  EMPTY = 0,
  BLACK = 1,
  WHITE = 2,
  BOARDER = 3,
}

export class Board {
  static readonly SIZE = 15;

  private data: Uint8Array;

  constructor() {
    this.data = new Uint8Array(Board.SIZE * Board.SIZE);
  }

  get(row: number, col: number): Piece {
    if (row < 0 || row >= Board.SIZE || col < 0 || col >= Board.SIZE) {
      return Piece.BOARDER;
    }
    return this.data[row * Board.SIZE + col];
  }

  set(row: number, col: number, piece: Piece): void {
    if (row < 0 || row >= Board.SIZE || col < 0 || col >= Board.SIZE) {
      return;
    }
    this.data[row * Board.SIZE + col] = piece;
  }
}

export default class GomokuCore {
  private board: Board;
  
  private history: Move[];

  private winner: Piece;

  constructor() {
    this.board = new Board();
    this.history = [];
    this.winner = Piece.EMPTY;
  }

  static fromHistory(history: readonly Move[]): GomokuCore {
    const board = new GomokuCore();
    for (let i = 0; i < history.length - 1; i += 1) {
      // board.move(history[i][0], history[i][1]);
      board.setBoardAt(history[i][0], history[i][1], board.getCurrentPlayer());
      board.pushMove(history[i][0], history[i][1]);
    }
    board.move(history[history.length - 1][0], history[history.length - 1][1]);
    return board;
  }

  getBoardAt(row: number, col: number): Piece {
    return this.board.get(row, col);
  }

  private setBoardAt(row: number, col: number, piece: Piece): void {
    this.board.set(row, col, piece);
  }

  getCurrentPlayer(): Piece {
    return this.history.length % 2 === 0 ? Piece.BLACK : Piece.WHITE;
  }

  getLastMove(): Move | null {
    if (this.history.length === 0) {
      return null;
    }
    return this.history[this.history.length - 1];
  }

  private pushMove(row: number, col: number): void {
    this.history.push([row, col]);
  }

  private popMove(): Move | null {
    const last = this.history.pop();
    if (last) return last;
    return null;
  }

  getWinner(): Piece {
    return this.winner;
  }

  private checkWinner(row: number, col: number, piece: Piece): void {
    // check horizontal
    for (let k = -5; k < 5; k += 1) {
      if (this.getBoardAt(row, col + k) === piece) {
        const start = k;
        while (this.getBoardAt(row, col + k + 1) === piece) k += 1;
        const end = k;
        if (end - start + 1 >= 5) {
          this.winner = piece;
          return;
        }
      }
    }
    // check vertical
    for (let k = -5; k < 5; k += 1) {
      if (this.getBoardAt(row + k, col) === piece) {
        const start = k;
        while (this.getBoardAt(row + k + 1, col) === piece) k += 1;
        const end = k;
        if (end - start + 1 >= 5) {
          this.winner = piece;
          return;
        }
      }
    }
    // check diagonal
    for (let k = -5; k < 5; k += 1) {
      if (this.getBoardAt(row + k, col + k) === piece) {
        const start = k;
        while (this.getBoardAt(row + k + 1, col + k + 1) === piece) k += 1;
        const end = k;
        if (end - start + 1 >= 5) {
          this.winner = piece;
          return;
        }
      }
    }
    // check anti-diagonal
    for (let k = -5; k < 5; k += 1) {
      if (this.getBoardAt(row + k, col - k) === piece) {
        const start = k;
        while (this.getBoardAt(row + k + 1, col - k - 1) === piece) k += 1;
        const end = k;
        if (end - start + 1 >= 5) {
          this.winner = piece;
          return;
        }
      }
    }
  }

  move(row: number, col: number): Piece | null {
    const piece = this.getCurrentPlayer();
    if (this.getBoardAt(row, col) === Piece.EMPTY) {
      this.setBoardAt(row, col, piece);
      this.pushMove(row, col);
      this.checkWinner(row, col, piece);
      return piece;
    }
    return null;
  }

  withdraw(): Move | null {
    const lastMove = this.popMove();
    if (lastMove)
      this.setBoardAt(lastMove[0], lastMove[1], Piece.EMPTY);
      this.winner = Piece.EMPTY;
    return lastMove;
  }

  reset(): void {
    this.board = new Board();
    this.history = [];
    this.winner = Piece.EMPTY;
  }
}
