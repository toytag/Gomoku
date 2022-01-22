#include "GomokuCoreWithAgent.h"

GomokuPiece GomokuCoreWithAgent::move(int row, int col)
{
    GomokuPiece piece = GomokuCore::move(row, col);
    if (piece != GomokuPiece::EMPTY && piece != GomokuPiece::BOARDER)
    {
        if (node->children.count({row, col}) == 0)
        {
            MonteCarloTreeNode* child = new MonteCarloTreeNode({row, col}, node);
            node->children.insert({{row, col}, child});
        }
        node = node->children.at({row, col});
    }
    return piece;
}

GomokuMove GomokuCoreWithAgent::withdraw()
{
    GomokuMove pos = GomokuCore::withdraw();
    if (node->parent != nullptr) node = node->parent;
    return pos;
}

int GomokuCoreWithAgent::search()
{
    return node->mcts();
}