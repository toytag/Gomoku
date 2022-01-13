import GomokuCore, { Piece, Move } from '../GomokuCore';
import MoveSet from './MoveSet';
import MoveMap from './MoveMap';

const UCB1_C = 2;
const TIME_LIMIT_MS = 3000;
const SIMULATION_LIMIT = 100000;
const EXPANSION_THRESHOLD = 1000;
const SIMULATION_BATCH_SIZE = 100;

function shuffle<Type>(array: Type[]): Type[] {
  const ret = [...array];
  for (let i = 0; i < array.length; i += 1) {
    // random index
    const randIdx = Math.floor(Math.random() * array.length);
    // swap array[i] and array[randIdx]
    [ret[i], ret[randIdx]] = [ret[randIdx], ret[i]];
  }
  return ret;
}

export default class MonteCarloTreeNode {
  move: Move | null;

  parent: MonteCarloTreeNode | null;

  children: MoveMap<MonteCarloTreeNode>;

  visits: number;

  wins: number;

  static lessThan(a: MonteCarloTreeNode, b: MonteCarloTreeNode): boolean {
    const aUCB1 = a.ucb1();
    const bUCB1 = b.ucb1();
    return (
      aUCB1 < bUCB1
      || (aUCB1 === bUCB1 && a.visits < b.visits)
      || (aUCB1 === bUCB1 && a.visits === b.visits && a.wins < b.wins)
    );
  }

  constructor(
    move: MonteCarloTreeNode['move'] = null,
    parent: MonteCarloTreeNode['parent'] = null,
  ) {
    this.move = move;
    this.parent = parent;
    this.children = new MoveMap;
    this.visits = 0;
    this.wins = 0;
  }

  approxWinningRate(eps: number = 1e-4): number {
    return this.wins / (this.visits + eps);
  }

  ucb1(eps: number = 1e-4): number {
    return this.approxWinningRate(eps) + Math.sqrt(
      UCB1_C * Math.log(this.parent ? this.parent.visits : this.visits) / (this.visits + eps));
  }

  select(): MonteCarloTreeNode {
    // select the child with the highest ucb1 value
    // or the child with the highest visits if ucb1 values are equal
    // or the child with the highest wins if ucb1 and visits values are equal
    let bestChild: MonteCarloTreeNode | null = null;
    this.children.forEach((child: MonteCarloTreeNode) => {
      if (!bestChild || MonteCarloTreeNode.lessThan(bestChild, child))
        bestChild = child;
    });
    return bestChild!;
  }

  completeHistory(): Move[] {
    const history: Move[] = [];
    let node: MonteCarloTreeNode = this;
    while (node.parent) {
      if (node.move) history.unshift(node.move);
      node = node.parent;
    }
    return history;
  }

  expansionMoves(history: Move[] = this.completeHistory()): Move[] {
    const historySet = MoveSet.fromArray(history);
    const expansionMoveSet = new MoveSet;
    for (let historyIdx = 0; historyIdx < history.length; historyIdx += 1) {
      for (let i = -2; i <= 2; i += 1) {
        for (let j = -2; j <= 2; j += 1) {
          const [row, col] = history[historyIdx];
          const move: Move = [row + i, col + j];
          if (!historySet.has(move)) expansionMoveSet.add(move);
        }
      }
    }
    return shuffle(Array.from(expansionMoveSet));
  }

  expand(): void {
    if (this.children.size > 0 || this.visits < EXPANSION_THRESHOLD || this.approxWinningRate(0) === 1)
      return;
    const moves = this.expansionMoves();
    for (let i = 0; i < moves.length; i += 1) {
      const child = new MonteCarloTreeNode(moves[i], this);
      this.children.set(moves[i], child);
    }
  }

  simulationMoves(history: Move[] = this.completeHistory()): Move[] {
    const historySet = MoveSet.fromArray(history);
    const moves: Move[] = [];
    for (let i = 0; i < GomokuCore.BOARD_SIZE; i += 1) {
      for (let j = 0; j < GomokuCore.BOARD_SIZE; j += 1) {
        if (!historySet.has([i, j])) {
          moves.push([i, j]);
        }
      }
    }
    return shuffle(moves);
  }

  simulate(): { player: Piece, winner: Piece } {
    // build complete history for simluation
    const history = this.completeHistory();
    // rebuild game using complete history
    const sim = GomokuCore.fromHistory(history);
    // get current player
    const player = sim.getCurrentPlayer();
    // check if game ends
    if (sim.getWinner() !== Piece.EMPTY)
      return { player, winner: sim.getWinner() };
    // random playout
    const moves = this.simulationMoves(history);
    for (let i = 0; i < moves.length; i += 1) {
      const move = moves[i];
      sim.move(move[0], move[1]);
      if (sim.getWinner() !== Piece.EMPTY)
        return { player, winner: sim.getWinner() }
    }
    // return simulation result
    return { player, winner: Piece.EMPTY };
  }

  backpropagate({ player, winner }: { player: Piece, winner: Piece }): void {
    this.visits += 1;
    this.wins += player === winner ? 1 : 0;
    if (this.parent) {
      this.parent.backpropagate({
        player: player === Piece.BLACK ? Piece.WHITE : Piece.BLACK,
        winner
      });
    }
  }

  mcts(): void {
    let simCount = 0;
    const startTime = Date.now();
    while (Date.now() - startTime < TIME_LIMIT_MS && simCount < SIMULATION_LIMIT) {
      let node: MonteCarloTreeNode = this;
      // selection
      while (node.children.size > 0) {
        node = node.select();
      }
      // expansion
      if (node.visits > EXPANSION_THRESHOLD && node.approxWinningRate(0) !== 1) {
        node.expand();
        node = node.select();
      }
      // simulation and backpropagation
      for (let i = 0; i < SIMULATION_BATCH_SIZE; i += 1) {
        // simulation
        const simResult = node.simulate();
        simCount += 1;
        // backpropagation
        node.backpropagate(simResult);
      }
    }
    // console.log(`simCount: ${simCount}`);
  }

  bestMove(): Move {
    let maxWR = -Infinity;
    let bestMove: Move;
    this.children.forEach((child: MonteCarloTreeNode) => {
      const wr = child.approxWinningRate();
      if (wr > maxWR) {
        maxWR = wr;
        bestMove = child.move!;
      }
    });
    return bestMove!;
  }
}
