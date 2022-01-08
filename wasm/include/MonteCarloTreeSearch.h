#ifndef MONTECARLOTREESEARCH_H
#define MONTECARLOTREESEARCH_H

#include <vector>
#include <cmath>

class MonteCarloTreeNode : public GomokuCore
{
public:
    // children
    std::vector<MonteCarloTreeNode> children;
    // parent
    MonteCarloTreeNode *parent{nullptr};
    // number of visits
    int visits{0};
    // wins
    int wins{0};

    MonteCarloTreeNode(MonteCarloTreeNode *parent) : parent(parent) {}
    ~MonteCarloTreeNode() = default;

    // selection
    void selection();
    // expand
    void expansion();
    // simulation
    void simulation();
    // backpropagation
    void backpropagation();
};

#endif // MONTECARLOTREESEARCH_H