#ifndef GOMOKUCOREWITHAGENT_H
#define GOMOKUCOREWITHAGENT_H

#include "GomokuCore.h"
#include "MonteCarloTreeSearch.h"

#define MAX_DEPTH 5

class GomokuCoreWithAgent : public GomokuCore
{
private:
    // node
    MonteCarloTreeNode *node;

public:
    // constructor
    GomokuCoreWithAgent() = default;
    // destructor
    ~GomokuCoreWithAgent() = default;

    // override move: player makes a move
    GomokuPiece move(int row, int col);
    // override withdraw: withdraw the last move
    std::pair<int, int> withdraw();
    // generate move
    std::pair<int, int> generate_move();
};

#endif // GOMOKUCOREWITHAGENT_H