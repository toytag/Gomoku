import GomokuCore, { GomokuPiece } from './GomokuCore';

const MCTS_UCB1_C = 2;
const MCTS_TIME_LIMIT = 10000; // ms
const MCTS_SIMULATION_LIMIT = 100000;
const MCTS_EXPANSION_LIMIT = 1;
const MCTS_SIMULATION_BATCH = 1;

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
  move: [number, number] | null;

  parent: MonteCarloTreeNode | null;

  children: MonteCarloTreeNode[];

  visits: number;

  wins: number;

  value: number;

  constructor(move: MonteCarloTreeNode['move'] = null, parent: MonteCarloTreeNode['parent'] = null) {
    this.move = move;
    this.parent = parent;
    this.children = [];
    this.visits = 0;
    this.wins = 0;
    this.value = 0;
  }

  averageValue(eps: number = 1e-8): number {
    return this.value / (this.visits + eps);
  }

  ucb1(eps: number = 1e-8): number {
    return this.wins / (this.visits + eps) + 
      Math.sqrt(MCTS_UCB1_C * Math.log(this.parent!.visits) / (this.visits + eps));
  }

  select(): MonteCarloTreeNode {
    // select the child with the highest ucb1 value,
    let bestChild = this.children[0];
    for (let i = 1; i < this.children.length; i += 1) {
      if (this.children[i].ucb1() > bestChild.ucb1()) {
        bestChild = this.children[i];
      }
    }
    return bestChild;
  }

  completeHistory(): [number, number][] {
    const history: [number, number][] = [];
    let node: MonteCarloTreeNode = this;
    while (node.parent) {
      if (node.move) history.unshift(node.move);
      node = node.parent;
    }
    return history;
  }

  possibleMoves(history: [number, number][] = this.completeHistory()): [number, number][] {
    // const history = this.completeHistory();
    const historySet = new Set;
    for (let i = 0; i < history.length; i += 1) {
      historySet.add(history[i].toString());
    }
    const moves: [number, number][] = [];
    for (let i = 0; i < GomokuCore.BOARD_SIZE; i += 1) {
      for (let j = 0; j < GomokuCore.BOARD_SIZE; j += 1) {
        if (!historySet.has([i, j].toString())) {
          moves.push([i, j]);
        }
      }
    }
    return shuffle(moves);
  }

  expand(): void {
    const moves = this.possibleMoves();
    for (let i = 0; i < moves.length; i += 1) {
      const child = new MonteCarloTreeNode(moves[i], this);
      this.children.push(child);
    }
  }

  simulate(): number {
    const history = this.completeHistory();
    const sim = GomokuCore.fromHistory(history);
    // random playout
    const moves = this.possibleMoves(history);
    for (let i = 0; i < moves.length; i += 1) {
      const move = moves[i];
      sim.move(move[0], move[1]);
      if (sim.winner !== GomokuPiece.EMPTY) {
        // computer always holds white
        return (sim.winner === GomokuPiece.WHITE ? 1 : -1) * (moves.length - i);
      }
    }
    return 0;
  }

  backpropagate(value: number): void {
    this.visits += 1;
    this.wins += value > 0 ? 1 : 0;
    this.value += value;
    if (this.parent) {
      this.parent.backpropagate(value);
    }
  }

  mcts(): MonteCarloTreeNode['move'] {
    let simCount = 0;
    const startTime = Date.now();
    while (Date.now() - startTime < MCTS_TIME_LIMIT && simCount < MCTS_SIMULATION_LIMIT) {
      // selection
      let node: MonteCarloTreeNode = this;
      while (node.children.length > 0) {
        node = node.select();
      }
      // expansion
      if (node.visits > MCTS_EXPANSION_LIMIT) {
        node.expand();
        node = node.select();
      }
      for (let i = 0; i < MCTS_SIMULATION_BATCH; i += 1) {
        // simulation
        const value = node.simulate();
        simCount += 1;
        // backpropagation
        node.backpropagate(value);
      }
    }
    console.log(this);
    // select the move of the child with the highest average value
    let bestChild = this.children[0];
    for (let i = 1; i < this.children.length; i += 1) {
      if (this.children[i].averageValue() > bestChild.averageValue()) {
        bestChild = this.children[i];
      }
    }
    return bestChild.move;
  }
}
