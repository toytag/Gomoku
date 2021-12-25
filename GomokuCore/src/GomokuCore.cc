#include "GomokuCore.h"

std::array<std::array<GomokuCore::Piece, GomokuCore::BOARD_SIZE>, GomokuCore::BOARD_SIZE>
GomokuCore::get_board() const
{
    return board;
}
