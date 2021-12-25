#include "GomokuCore.h"
#include <emscripten/bind.h>

// Binding code
using namespace emscripten;
EMSCRIPTEN_BINDINGS(gomoku_core) {
    class_<GomokuCore>("GomokuCore")
        .constructor()
        .property("board", &GomokuCore::get_board);
}