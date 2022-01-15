import GomokuCore, { Move, Piece, Board } from './GomokuCore';

const UCB1_C = 2;
const TIME_LIMIT_MS = 3000;
const SIMULATION_LIMIT = 50000;
const EXPANSION_THRESHOLD = 10;
const SIMULATION_BATCH_SIZE = 1;

const timeReport = {
  total: 0,
  selection: 0,
  expansion: 0,
  simulation: {
    total: 0,
    preparation: 0,
    playout: 0,
  },
  backpropagation: 0,
};

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

  children: Map<string, MonteCarloTreeNode>;

  visits: number;

  wins: number;

  constructor(
    move: MonteCarloTreeNode['move'] = null,
    parent: MonteCarloTreeNode['parent'] = null,
  ) {
    this.move = move;
    this.parent = parent;
    this.children = new Map<string, MonteCarloTreeNode>();
    this.visits = 0;
    this.wins = 0;
  }

  approxWinningRate(eps: number = 1e-8): number {
    return this.wins / (this.visits + eps);
  }

  ucb1(eps: number = 1e-8): number {
    return this.approxWinningRate(eps) + Math.sqrt(
      UCB1_C * Math.log(this.parent ? this.parent.visits : 0) / (this.visits + eps));
  }

  select(): MonteCarloTreeNode {
    // select the child with the highest ucb1 value
    let bestUCB1: number = -Infinity;
    let bestChild: MonteCarloTreeNode | null = null;
    this.children.forEach((child: MonteCarloTreeNode) => {
      const ucb1 = child.ucb1();
      if (!bestChild || bestUCB1 < ucb1) {
        bestUCB1 = ucb1;
        bestChild = child;
      }
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
    const historySet = new Set<string>();
    for (let i = 0; i < history.length; i += 1) {
      historySet.add(history[i].toString());
    }
    const moveSet = new Set<string>();
    const moves: Move[] = [];
    for (let idx = 0; idx < history.length; idx += 1) {
      for (let i = -1; i <= 1; i += 1) {
        for (let j = -1; j <= 1; j += 1) {
          const [row, col] = history[idx];
          const move: Move = [row + i, col + j];
          if (
            !historySet.has(move.toString()) 
            && !moveSet.has(move.toString())
            && move[0] >= 0 && move[0] < Board.SIZE
            && move[1] >= 0 && move[1] < Board.SIZE
          ) {
            moveSet.add(move.toString());
            moves.push(move);
          }
        }
      }
    }
    return shuffle(moves);
  }

  expand(): void {
    if (this.children.size > 0 || this.visits < EXPANSION_THRESHOLD || this.approxWinningRate(0) === 1)
      return;
    const moves = this.expansionMoves();
    for (let i = 0; i < moves.length; i += 1) {
      const child = new MonteCarloTreeNode(moves[i], this);
      this.children.set(moves[i].toString(), child);
    }
  }

  simulationMoves(history: Move[] = this.completeHistory()): Move[] {
    const historySet = new Set<string>();
    for (let i = 0; i < history.length; i += 1) {
      historySet.add(history[i].toString());
    }
    const moves: Move[] = [];
    for (let i = 0; i < Board.SIZE; i += 1) {
      for (let j = 0; j < Board.SIZE; j += 1) {
        if (!historySet.has([i, j].toString())) {
          moves.push([i, j]);
        }
      }
    }
    return shuffle(moves);
  }

  simulate(): { player: Piece, winner: Piece } {
    let timestamp = Date.now();

    // build complete history for simluation
    const history = this.completeHistory();
    // rebuild game using complete history
    const sim = GomokuCore.fromHistory(history);
    // get current player
    const player = sim.getCurrentPlayer() === Piece.BLACK ? Piece.WHITE : Piece.BLACK;
    // check if game ends
    if (sim.getWinner() !== Piece.EMPTY)
      return { player, winner: sim.getWinner() };
    // console.log(`Simulation preparation time: ${Date.now() - timestamp}`);

    timeReport.simulation.preparation += Date.now() - timestamp;
    timestamp = Date.now();

    // random playout
    const moves = this.simulationMoves(history);
    for (let i = 0; i < moves.length; i += 1) {
      const [row, col] = moves[i];
      sim.move(row, col);
      if (sim.getWinner() !== Piece.EMPTY) {
        timeReport.simulation.playout += Date.now() - timestamp;
        timestamp = Date.now();

        return { player, winner: sim.getWinner() }

      }
    }

    timeReport.simulation.playout += Date.now() - timestamp;
    timestamp = Date.now();

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
      
      let timestamp = Date.now();
      
      // selection
      while (node.children.size > 0) {
        node = node.select();
      }

      timeReport.selection += Date.now() - timestamp;
      timestamp = Date.now();

      // expansion
      if (node.visits > EXPANSION_THRESHOLD && node.approxWinningRate(0) !== 1) {
        node.expand();
        node = node.select();
      }

      timeReport.expansion += Date.now() - timestamp;
      timestamp = Date.now();

      // simulation and backpropagation
      for (let i = 0; i < SIMULATION_BATCH_SIZE; i += 1) {
        // simulation
        const simResult = node.simulate();
        simCount += 1;

        timeReport.simulation.total += Date.now() - timestamp;
        timestamp = Date.now();

        // backpropagation
        node.backpropagate(simResult);

        timeReport.backpropagation += Date.now() - timestamp;
        timestamp = Date.now();
      }
    }
    timeReport.total += Date.now() - startTime;
    console.log(`Simulation time report (ms): ${JSON.stringify(timeReport)}`);
    console.log(`Simulation count: ${simCount}`);
  }

  bestMove(): Move | null {
    // select the child with the highest winning rate
    let bestWR = -Infinity;
    let bestMove: Move | null = null;
    this.children.forEach((child: MonteCarloTreeNode) => {
      const wr = child.approxWinningRate();
      if (!bestMove || bestWR < wr) {
        bestWR = wr;
        bestMove = child.move;
      }
    });
    return bestMove;
  }
}
