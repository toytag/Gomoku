#include "GomokuCore.h"

GomokuPiece GomokuCore::get_board_at(int row, int col) const
{
    // out of bounds
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE)
        return GomokuPiece::BOARDER;
    return board[row * BOARD_SIZE + col];
}

void GomokuCore::set_board_at(int row, int col, GomokuPiece piece)
{
    // out of bounds
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE)
        return;
    board[row * BOARD_SIZE + col] = piece;
}

GomokuPiece GomokuCore::get_current_player() const
{
    return history.size() % 2 == 0 ? GomokuPiece::BLACK : GomokuPiece::WHITE;
}

GomokuPiece GomokuCore::move(int row, int col)
{
    // non-empty
    auto piece = get_board_at(row, col);
    if (piece != GomokuPiece::EMPTY)
        return piece;
    auto current_player = get_current_player();
    set_board_at(row, col, current_player);
    history.push(std::make_pair(row, col));
    return current_player;
}

std::pair<int, int> GomokuCore::withdraw()
{
    // empty
    if (history.empty())
        return std::make_pair(-1, -1);
    auto last = history.top();
    history.pop();
    set_board_at(last.first, last.second, GomokuPiece::EMPTY);
    return last;
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