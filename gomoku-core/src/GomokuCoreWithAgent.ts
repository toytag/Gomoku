import GomokuCore, { Piece, Move } from './utils/GomokuCore';
import MonteCarloTreeNode from './utils/MonteCarloTreeNode';

export default class GomokuCoreWithAgent extends GomokuCore {
  node: MonteCarloTreeNode;

  constructor() {
    super();
    this.node = new MonteCarloTreeNode;
  }

  private getNextNode(row: number, col: number): MonteCarloTreeNode {
    let nextNode = this.node.children.get([row, col].toString());
    if (!nextNode) {
      nextNode = new MonteCarloTreeNode([row, col], this.node);
      this.node.children.set([row, col].toString(), nextNode);
    }
    return nextNode;
  }

  override move(row: number, col: number): Piece | null {
    const piece = super.move(row, col);
    if (piece) this.node = this.getNextNode(row, col);
    return piece;
  }

  override withdraw(): Move | null {
    const pos = super.withdraw();
    if (pos) this.node = this.node.parent!;
    return pos;
  }

  override reset(): void {
    super.reset();
    while (this.node.parent) {
      this.node = this.node.parent!;
    }
  }

  search(): Move {
    this.node.mcts();
    return this.node.bestMove();
  }
}