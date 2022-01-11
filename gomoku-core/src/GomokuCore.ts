export enum GomokuPiece {
  EMPTY = 0,
  BLACK = 1,
  WHITE = 2,
  BOARDER = 3,
}

export default class GomokuCore {
  static readonly BOARD_SIZE = 15;

  board: GomokuPiece[][];
  
  history: [number, number][];

  winner: GomokuPiece;

  static fromHistory(history: [number, number][]): GomokuCore {
    const board = new GomokuCore();
    for (let i = 0; i < history.length; i += 1) {
      board.move(history[i][0], history[i][1]);
    }
    return board;
  }

  constructor() {
    this.board = new Array(GomokuCore.BOARD_SIZE).fill(0).map(
      () => new Array(GomokuCore.BOARD_SIZE).fill(GomokuPiece.EMPTY));
    this.history = [];
    this.winner = GomokuPiece.EMPTY;
  }

  getBoardAt(row: number, col: number): GomokuPiece {
    if (row < 0 || row >= GomokuCore.BOARD_SIZE || col < 0 || col >= GomokuCore.BOARD_SIZE) {
      return GomokuPiece.BOARDER;
    }
    return this.board[row][col];
  }

  setBoardAt(row: number, col: number, piece: GomokuPiece): void {
    if (row < 0 || row >= GomokuCore.BOARD_SIZE || col < 0 || col >= GomokuCore.BOARD_SIZE) {
      return;
    }
    this.board[row][col] = piece;
  }

  getBoard(): readonly GomokuPiece[][] {
    return this.board;
  }

  getCurrentPlayer(): GomokuPiece {
    return this.history.length % 2 === 0 ? GomokuPiece.BLACK : GomokuPiece.WHITE;
  }

  getLastMove(): readonly [number, number] | null {
    if (this.history.length === 0) {
      return null;
    }
    return this.history[this.history.length - 1];
  }

  pushMove(row: number, col: number): void {
    this.history.push([row, col]);
  }

  popMove(): readonly [number, number] | null {
    const last = this.history.pop();
    if (last) return last;
    return null;
  }

  getWinner(): GomokuPiece {
    return this.winner;
  }

  checkWinner(row: number, col: number, piece: GomokuPiece): void {
    // check horizontal
    for (let k = -5; k <= 5; k += 1) {
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
    for (let k = -5; k <= 5; k += 1) {
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
    for (let k = -5; k <= 5; k += 1) {
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
    for (let k = -5; k <= 5; k += 1) {
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

  move(row: number, col: number): GomokuPiece | null {
    const piece = this.getCurrentPlayer();
    if (this.getBoardAt(row, col) === GomokuPiece.EMPTY) {
      this.setBoardAt(row, col, piece);
      this.pushMove(row, col);
      this.checkWinner(row, col, piece);
      return piece;
    }
    return null;
  }

  withdraw(): readonly [number, number] | null {
    const lastMove = this.popMove();
    if (lastMove)
      this.setBoardAt(lastMove[0], lastMove[1], GomokuPiece.EMPTY);
      this.winner = GomokuPiece.EMPTY;
    return lastMove;
  }
}
