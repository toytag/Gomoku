#ifndef GOMOKUAGENT_H
#define GOMOKUAGENT_H

#include "GomokuCore.h"

#define MAX_DEPTH 5

class GomokuAgent : public GomokuCore
{
    // computer makes a move using minimax algorithm
    void computer_move_minimax();
    // computer makes a move using alpha-beta pruning algorithm
    void computer_move_alphabeta();
    // computer makes a move using alpha-beta pruning algorithm with transposition table
    void computer_move_alphabeta_tt();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening
    void computer_move_alphabeta_tt_id();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening and move ordering
    void computer_move_alphabeta_tt_id_mo();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening and move ordering and history heuristic
    void computer_move_alphabeta_tt_id_mo_hh();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening and move ordering and history heuristic and killer heuristic
    void computer_move_alphabeta_tt_id_mo_hh_kh();
    // computer makes a move using alpha-beta pruning algorithm with transposition table and iterative deepening and move ordering and history heuristic and killer heuristic and history-based move ordering
    void computer_move_alphabeta_tt_id_mo_hh_kh_hmo();
};

#endif // GOMOKUAGENT_H