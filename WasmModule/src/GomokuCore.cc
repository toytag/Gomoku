#include "GomokuCore.h"

GomokuPiece GomokuCore::get_board_at(int row, int col) const
{
    // out of bounds
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE)
        return GomokuPiece::EMPTY;
    return board[row * BOARD_SIZE + col];
}

void GomokuCore::set_board_at(int row, int col, GomokuPiece piece)
{
    // out of bounds
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE)
        return;
    board[row * BOARD_SIZE + col] = piece;
}

void GomokuCore::player_move(int row, int col, GomokuPiece piece)
{
    // non-empty
    if (get_board_at(row, col) != GomokuPiece::EMPTY)
        return;
    set_board_at(row, col, piece);
}

GomokuPiece GomokuCore::check_winner()
{
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        for (int j = 0; j < BOARD_SIZE; j++)
        {
            if (get_board_at(i, j) == GomokuPiece::EMPTY)
                continue;
            if ( // check horizontal
                (get_board_at(i, j) == get_board_at(i, j - 2) &&
                 get_board_at(i, j) == get_board_at(i, j - 1) &&
                 get_board_at(i, j) == get_board_at(i, j + 1) &&
                 get_board_at(i, j) == get_board_at(i, j + 2)) ||
                // check vertical
                (get_board_at(i, j) == get_board_at(i - 2, j) &&
                 get_board_at(i, j) == get_board_at(i - 1, j) &&
                 get_board_at(i, j) == get_board_at(i + 1, j) &&
                 get_board_at(i, j) == get_board_at(i + 2, j)) ||
                // check diagonal
                (get_board_at(i, j) == get_board_at(i - 2, j - 2) &&
                 get_board_at(i, j) == get_board_at(i - 1, j - 1) &&
                 get_board_at(i, j) == get_board_at(i + 1, j + 1) &&
                 get_board_at(i, j) == get_board_at(i + 2, j + 2)) ||
                // check anti-diagonal
                (get_board_at(i, j) == get_board_at(i - 2, j + 2) &&
                 get_board_at(i, j) == get_board_at(i - 1, j + 1) &&
                 get_board_at(i, j) == get_board_at(i + 1, j - 1) &&
                 get_board_at(i, j) == get_board_at(i + 2, j - 2)))
            {
                return get_board_at(i, j);
            }
        }
    }
    return GomokuPiece::EMPTY;
}