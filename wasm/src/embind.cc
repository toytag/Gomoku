#include "GomokuCore.h"
#include "GomokuCoreWithAgent.h"
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
        .value("BOARDER", GomokuPiece::BOARDER);
        ;
}

val get_board(GomokuCoreWithAgent& instance)
{
    val board = val::array();
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        val row = val::array();
        for (int j = 0; j < BOARD_SIZE; j++)
        {
            row.call<void>("push", instance.get_board_at(i, j));
        }
        board.call<void>("push", row);
    }
    return board;
}

val withdraw(GomokuCoreWithAgent& instance)
{
    auto pos = instance.withdraw();
    val ret = val::array();
    ret.call<void>("push", pos.first);
    ret.call<void>("push", pos.second);
    return ret;
}

// class binding
EMSCRIPTEN_BINDINGS(class)
{
    class_<GomokuCore>("GomokuCore")
        .constructor<>()
        .function("get_board_at", &GomokuCore::get_board_at)
        .function("get_board", &get_board)
        .function("get_current_player", &GomokuCore::get_current_player)
        .function("get_winner", &GomokuCore::get_winner)
        .function("move", &GomokuCore::move)
        .function("withdraw", &withdraw)
        ;
    
    class_<GomokuCoreWithAgent, base<GomokuCore>>("GomokuCoreWithAgent")
        .constructor<>()
        .function("move", &GomokuCoreWithAgent::move)
        .function("withdraw", &withdraw)
        ;
}