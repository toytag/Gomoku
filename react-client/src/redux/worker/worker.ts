import GomokuCoreWithAgent from 'gomoku-core';

const gomoku = new GomokuCoreWithAgent();

export function getBoardAt(row: number, col: number) {
  return gomoku.getBoardAt(row, col);
}

export function getCurrentPlayer() {
  return gomoku.getCurrentPlayer();
}

export function getLastMove() {
  return gomoku.getLastMove();
}

export function getWinner() {
  return gomoku.getWinner();
}

export function move(row: number, col: number) {
  return gomoku.move(row, col);
}

export function withdraw() {
  return gomoku.withdraw();
}

export function reset() {
  return gomoku.reset();
}

export function search() {
  return gomoku.search();
}
