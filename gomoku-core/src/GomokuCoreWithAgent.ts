import GomokuCore, { Piece } from './GomokuCore';
import MonteCarloTreeNode from './utils/MonteCarloTreeNode';

export default class GomokuCoreWithAgent extends GomokuCore {
  private node: MonteCarloTreeNode;

  constructor() {
    super();
    this.node = new MonteCarloTreeNode;
  }

  private getNextNode(row: number, col: number): MonteCarloTreeNode {
    let nextNode = this.node.children.get([row, col]);
    if (!nextNode) {
      nextNode = new MonteCarloTreeNode([row, col], this.node);
      this.node.children.set([row, col], nextNode);
    }
    return nextNode;
  }

  override move(row: number, col: number): Piece | null {
    const piece = super.move(row, col);
    if (piece) this.node = this.getNextNode(row, col);
    return piece;
  }

  override withdraw(): readonly [number, number] | null {
    const pos = super.withdraw();
    if (pos) this.node = this.node.parent!;
    return pos;
  }
}