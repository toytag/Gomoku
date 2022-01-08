#include "GomokuCore.h"

// protected functions
void GomokuCore::set_board_at(int row, int col, GomokuPiece piece)
{
    // out of bounds
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE)
        return;
    board[row * BOARD_SIZE + col] = piece;
}

void GomokuCore::push_move(int row, int col)
{
    history.push(std::make_pair(row, col));
}

void GomokuCore::pop_move()
{
    history.pop();
}

void GomokuCore::set_winner(GomokuPiece winner)
{
    this->winner = winner;
}


// public functions
GomokuPiece GomokuCore::get_board_at(int row, int col)
{
    // out of bounds
    if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE)
        return GomokuPiece::BOARDER;
    return board[row * BOARD_SIZE + col];
}


GomokuPiece GomokuCore::get_current_player()
{
    return history.size() % 2 == 0 ? GomokuPiece::BLACK : GomokuPiece::WHITE;
}

std::pair<int, int> GomokuCore::get_last_move()
{
    if (history.empty())
        return std::make_pair(-1, -1);
    return history.top();
}

GomokuPiece GomokuCore::get_winner()
{
    return winner;
}

GomokuPiece GomokuCore::move(int row, int col)
{
    // non-empty
    auto piece = get_board_at(row, col);
    if (piece != GomokuPiece::EMPTY)
        return piece;
    auto current_player = get_current_player();
    set_board_at(row, col, current_player);
    push_move(row, col);
    // check if the current player wins
    {
        // check horizontal
        for (int j = 0; j < BOARD_SIZE; j++)
        {
            if (get_board_at(row, j) == current_player)
            {
                int start = j;
                while (get_board_at(row, j + 1) == current_player) j++;
                int end = j;
                if (end - start + 1 >= 5)
                {
                    set_winner(current_player);
                    return current_player;
                }
            }
        }
        // check vertical
        for (int i = 0; i < BOARD_SIZE; i++)
        {
            if (get_board_at(i, col) == current_player)
            {
                int start = i;
                while (get_board_at(i + 1, col) == current_player) i++;
                int end = i;
                if (end - start + 1 >= 5)
                {
                    set_winner(current_player);
                    return current_player;
                }
            }
        }
        // check diagonal
        for (int k = - std::min(row, col); k + std::max(row, col) < BOARD_SIZE; k++)
        {
            if (get_board_at(row + k, col + k) == current_player)
            {
                int start = k;
                while (get_board_at(row + k + 1, col + k + 1) == current_player) k++;
                int end = k;
                if (end - start + 1 >= 5)
                {
                    set_winner(current_player);
                    return current_player;
                }
            }
        }
        // check anti-diagonal
        for (int k = - std::min(row, BOARD_SIZE - 1 - col); k + std::max(row, BOARD_SIZE - 1 - col) < BOARD_SIZE; k++)
        {
            if (get_board_at(row + k, col - k) == current_player)
            {
                int start = k;
                while (get_board_at(row + k + 1, col - k - 1) == current_player) k++;
                int end = k;
                if (end - start + 1 >= 5)
                {
                    set_winner(current_player);
                    return current_player;
                }
            }
        }
    }
    return current_player;
}

std::pair<int, int> GomokuCore::withdraw()
{
    // empty
    auto last = get_last_move();
    pop_move();
    set_board_at(last.first, last.second, GomokuPiece::EMPTY);
    set_winner(GomokuPiece::EMPTY);
    return last;
}
