#ifndef MONTECARLOTREESEARCH_H
#define MONTECARLOTREESEARCH_H

#include <unordered_map>
#include <vector>

#define UCB1_C 2.0
#define TIME_LIMIT_MS 3000
#define MAX_SIMULATION_COUNT 100000
#define EXPANSION_THRESHOLD 1000
#define SIMULATION_BATCH 100

struct move_hash
{
    std::size_t operator() (const GomokuMove &pair) const {
        return std::hash<uint8_t>()(pair.first * BOARD_SIZE + pair.second);
    }
};

class MonteCarloTreeNode
{
public:
    // move
    GomokuMove move;
    // children
    std::unordered_map<GomokuMove, MonteCarloTreeNode*, move_hash> children;
    // parent
    MonteCarloTreeNode* parent{nullptr};
    // number of visits
    int visits{0};
    // wins
    int wins{0};

    MonteCarloTreeNode() : move(std::make_pair(-1, -1)), parent(nullptr) {};
    MonteCarloTreeNode(GomokuMove move, MonteCarloTreeNode* parent)
        : move(move), parent(parent) {}
    ~MonteCarloTreeNode() = default;

    // ucb1
    float ucb1(float eps) const;
    // selection
    MonteCarloTreeNode* select();
    // complete history
    std::vector<GomokuMove> complete_history();
    // possible expansion moves
    std::vector<GomokuMove> expansion_moves(const std::vector<GomokuMove> history);
    // expand
    void expand();
    // possible simulation moves
    std::vector<GomokuMove> simulation_moves(const std::vector<GomokuMove> history);
    // simulation
    int simulate();
    // backpropagation
    void backpropagate(int value);
    // mcts
    int mcts();
};

#endif // MONTECARLOTREESEARCH_H