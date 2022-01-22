import { MonteCarloTreeNode } from '../index';

it("test", () => {
  const root = new MonteCarloTreeNode;
  const node = new MonteCarloTreeNode([7, 7], root);

  node.mcts();
});