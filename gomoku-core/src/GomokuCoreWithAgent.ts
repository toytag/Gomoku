import GomokuCore, { GomokuPiece } from './GomokuCore';
import MonteCarloTreeNode from './MonteCarloTreeNode';

export default class GomokuCoreWithAgent extends GomokuCore {
  curr: MonteCarloTreeNode;

  constructor() {
    super();
    this.curr = new MonteCarloTreeNode();
  }

  getNextNode(row: number, col: number): MonteCarloTreeNode {
    let nextNode: MonteCarloTreeNode = this.curr;
    if (this.curr.children.length === 0) this.curr.expand();
    for (let i = 0; i < this.curr.children.length; i += 1) {
      if (this.curr.children[i].move![0] === row && this.curr.children[i].move![1] === col) {
        nextNode = this.curr.children[i];
      }
    }
    return nextNode;
  }

  move(row: number, col: number): GomokuPiece | null {
    const piece = super.move(row, col);
    if (piece) {
      this.curr = this.getNextNode(row, col);
    }
    return piece;
  }

  counterMove(): readonly [number, number] {
    const [row, col] = this.curr.mcts()!;
    this.move(row, col);
    return [row, col];
  }

  withdraw(): readonly [number, number] | null {
    const pos = super.withdraw();
    if (pos) this.curr = this.curr.parent!;
    return pos;
  }
}