#include "GomokuCore.h"
#include "MonteCarloTreeSearch.h"

#include <algorithm>
#include <chrono>
#include <cmath>
#include <random>
#include <unordered_map>
#include <unordered_set>
#include <vector>
#include <iostream>

uint64_t get_time_ms() {
    return std::chrono::duration_cast<std::chrono::milliseconds>(
        std::chrono::system_clock::now().time_since_epoch()
    ).count();
}

inline float MonteCarloTreeNode::ucb1(float eps = 1e-4) const
{
    return (float)wins / (visits + eps) + sqrt(UCB1_C * log(parent->visits) / (visits + eps));
}

MonteCarloTreeNode* MonteCarloTreeNode::select()
{
    // find the best child
    auto best_child = std::max_element(children.begin(), children.end(),
        [](auto const& lhs, auto const& rhs) {
            return lhs.second->ucb1() < rhs.second->ucb1();
        });
    // return the best child
    return best_child->second;
}

std::vector<GomokuMove> MonteCarloTreeNode::complete_history()
{
    std::vector<GomokuMove> history;
    MonteCarloTreeNode *node = this;
    while (node->parent != nullptr)
    {
        history.push_back(node->move);
        node = node->parent;
    }
    std::reverse(history.begin(), history.end());
    return history;
}

std::vector<GomokuMove> MonteCarloTreeNode::expansion_moves(
    const std::vector<GomokuMove> history_vec)
{
    std::unordered_set<GomokuMove, move_hash> history_set(history_vec.begin(), history_vec.end());
    std::unordered_set<GomokuMove, move_hash> moves_set;
    for (auto elem : history_vec)
    {
        for (int i = -2; i <= 2; i++)
        {
            for (int j = -2; j <= 2; j++)
            {
                int row = elem.first + i;
                int col = elem.second + j;
                // no history move
                if (history_set.count({row, col}) > 0)
                    continue;
                // no invalid move
                if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE)
                    continue;
                moves_set.insert({row, col});
            }
        }
    }
    std::vector<GomokuMove> moves_vec(moves_set.begin(), moves_set.end());
    std::shuffle(moves_vec.begin(), moves_vec.end(), std::default_random_engine(std::random_device{}()));
    return moves_vec;
}

void MonteCarloTreeNode::expand()
{
    // possible moves
    std::vector<GomokuMove> moves_vec = expansion_moves(complete_history());
    // expand
    for (auto elem : moves_vec)
    {
        MonteCarloTreeNode* child = new MonteCarloTreeNode(elem, this);
        children.insert({elem, child});
    }
}

std::vector<GomokuMove> MonteCarloTreeNode::simulation_moves(
    const std::vector<GomokuMove> history_vec)
{
    std::unordered_set<GomokuMove, move_hash> history_set(history_vec.begin(), history_vec.end());
    std::vector<GomokuMove> moves_vec;
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        for (int j = 0; j < BOARD_SIZE; j++)
        {
            // no history move
            if (history_set.count({i, j}) > 0)
                continue;
            moves_vec.push_back({i, j});
        }
    }
    std::shuffle(moves_vec.begin(), moves_vec.end(), std::default_random_engine(std::random_device{}()));
    return moves_vec;
}

int MonteCarloTreeNode::simulate()
{
    // complete history
    std::vector<GomokuMove> history_vec = complete_history();
    // possible moves
    std::vector<GomokuMove> moves_vec = simulation_moves(history_vec);
    // simulate
    GomokuCore sim;
    for (auto elem : history_vec)
    {
        sim.move(elem.first, elem.second);
    }
    for (auto elem : moves_vec)
    {
        sim.move(elem.first, elem.second);
        if (sim.get_winner() != GomokuPiece::EMPTY)
        {
            return (sim.get_winner() == GomokuPiece::WHITE ? 1 : 0);
        }
    }
    return 0;
}

void MonteCarloTreeNode::backpropagate(int value)
{
    MonteCarloTreeNode *node = this;
    while (node != nullptr)
    {
        node->visits++;
        node->wins += value;
        node = node->parent;
    }
}

int MonteCarloTreeNode::mcts()
{
    int sim_count = 0;
    auto start_time = get_time_ms();
    while(sim_count < MAX_SIMULATION_COUNT && get_time_ms() - start_time < TIME_LIMIT_MS)
    {
        MonteCarloTreeNode* node = this;
        // selection
        while (node->children.size() > 0)
            node = node->select();
        // expansion
        if (node->visits > EXPANSION_THRESHOLD)
        {
            node->expand();
            node = node->select();
        }
        // simulation and backpropagation
        for (int i = 0; i < SIMULATION_BATCH; i++)
        {
            int value = node->simulate();
            node->backpropagate(value);
            sim_count++;
        }
        std::cout << "simulation count: " << sim_count << std::endl;
    }
    return sim_count;
}
