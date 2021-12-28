#include "GomokuCore.h"
#include <emscripten/bind.h>
#include <emscripten/val.h>

using namespace emscripten;

// type binding
EMSCRIPTEN_BINDINGS(type)
{
    enum_<GomokuPiece>("GomokuPiece")
        .value("EMPTY", GomokuPiece::EMPTY)
        .value("BLACK", GomokuPiece::BLACK)
        .value("WHITE", GomokuPiece::WHITE)
        ;
}

val get_board(GomokuCore& instance)
{
    val board = val::array();
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        val row = val::array();
        for (int j = 0; j < BOARD_SIZE; j++)
        {
            row.call<void>("push", (int)instance.get_board_at(i, j));
        }
        board.call<void>("push", row);
    }
    return board;
}

// class binding
EMSCRIPTEN_BINDINGS(class)
{
    class_<GomokuCore>("GomokuCore")
        .constructor<>()
        .function("get_board_at", &GomokuCore::get_board_at)
        .function("set_board_at", &GomokuCore::set_board_at)
        .function("get_board", &get_board)
        .function("player_move", &GomokuCore::player_move)
        .function("check_winner", &GomokuCore::check_winner)
        ;
}