#ifndef GOMOKUCOREWITHAGENT_H
#define GOMOKUCOREWITHAGENT_H

#include "GomokuCore.h"

#define MAX_DEPTH 5

class GomokuCoreWithAgent : public GomokuCore
{
public:
    // constructor
    GomokuCoreWithAgent() = default;
    // destructor
    ~GomokuCoreWithAgent() = default;

    // player makes a move
    GomokuPiece move(const int row, const int col);
    // situation evaluation of the current player
    int evaluate();
    // minimax with alpha-beta pruning
    // void minimax_alphabeta(int depth, int alpha, int beta, bool maximizing);
    // computer makes a move using alpha-beta pruning algorithm
    // void computer_move_alphabeta();
    // computer makes a move using alpha-beta pruning algorithm with transposition table
    // void computer_move_alphabeta_tt();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening
    // void computer_move_alphabeta_tt_id();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening and move ordering
    // void computer_move_alphabeta_tt_id_mo();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening and move ordering and history heuristic
    // void computer_move_alphabeta_tt_id_mo_hh();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening and move ordering and history heuristic and killer heuristic
    // void computer_move_alphabeta_tt_id_mo_hh_kh();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening and move ordering and history heuristic and killer heuristic and history-based move ordering
    // void computer_move_alphabeta_tt_id_mo_hh_kh_hmo();
};

#endif // GOMOKUCOREWITHAGENT_H