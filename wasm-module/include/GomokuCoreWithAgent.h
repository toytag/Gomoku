#ifndef GOMOKUCOREWITHAGENT_H
#define GOMOKUCOREWITHAGENT_H

#include "GomokuCore.h"
#include "MonteCarloTreeSearch.h"

class GomokuCoreWithAgent : public GomokuCore
{
private:
    // node
    MonteCarloTreeNode *node;

public:
    // constructor
    GomokuCoreWithAgent() : GomokuCore(), node(new MonteCarloTreeNode) {};
    // destructor
    ~GomokuCoreWithAgent() = default;

    // override move: player makes a move
    GomokuPiece move(int row, int col);
    // override withdraw: withdraw the last move
    GomokuMove withdraw();
    // search for the best move
    int search();
};

#endif // GOMOKUCOREWITHAGENT_H