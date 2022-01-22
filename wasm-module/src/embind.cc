#include "GomokuCore.h"
#include "GomokuCoreWithAgent.h"
#include "MonteCarloTreeSearch.h"
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

    value_array<GomokuMove>("GomokuMove")
        .element(&GomokuMove::first)
        .element(&GomokuMove::second);

    // register_vector<std::pair<int, int>>("VectorIntInt");

    // register_map<std::pair<int, int>, MonteCarloTreeNode>("MapIntIntMonteCarloTreeNode");
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

// val withdraw(GomokuCoreWithAgent& instance)
// {
//     auto pos = instance.withdraw();
//     val ret = val::array();
//     ret.call<void>("push", pos.first);
//     ret.call<void>("push", pos.second);
//     return ret;
// }

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
        .function("withdraw", &GomokuCore::withdraw)
        ;

    // class_<MonteCarloTreeNode>("MonteCarloTreeNode")
    //     .constructor<>()
    //     .function("simulation_moves", &MonteCarloTreeNode::simulation_moves)
    //     ;
    
    class_<GomokuCoreWithAgent, base<GomokuCore>>("GomokuCoreWithAgent")
        .constructor<>()
        .function("move", &GomokuCoreWithAgent::move)
        .function("withdraw", &GomokuCoreWithAgent::withdraw)
        .function("search", &GomokuCoreWithAgent::search)
        ;
}