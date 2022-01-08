#include "GomokuCore.h"
#include "MonteCarloTreeSearch.h"

void MonteCarloTreeNode::expansion()
{
    // generate all possible moves
    for (int row = 0; row < BOARD_SIZE; row++)
    {
        for (int col = 0; col < BOARD_SIZE; col++)
        {
            // non-empty
            auto piece = get_board_at(row, col);
            if (piece != GomokuPiece::EMPTY)
                continue;
            // create child
            MonteCarloTreeNode child(this);
            // set board
            child.set_board_at(row, col, get_current_player());
            // push move
            child.push_move(row, col);
            // add child
            children.push_back(child);
        }
    }
}