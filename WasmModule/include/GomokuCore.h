#ifndef GOMOKUCORE_H
#define GOMOKUCORE_H

#include <array>
#include <stack>
#include <cstdint>

#define BOARD_SIZE 15

enum class GomokuPiece : uint8_t
{
    EMPTY = 0,
    BLACK = 1,
    WHITE = 2,
    BOARDER = 3,
};

class GomokuCore
{
protected:
    // gomoku board represented as a 1d array
    std::array<GomokuPiece, BOARD_SIZE * BOARD_SIZE> board{GomokuPiece::EMPTY};
    // history of moves
    std::stack<std::pair<uint8_t, uint8_t>> history;

public:
    // constructor
    GomokuCore() = default;
    // destructor
    ~GomokuCore() = default;

    // get the piece at the given row and column
    GomokuPiece get_board_at(int row, int col) const;
    // set the piece at the given row and column
    void set_board_at(int row, int col, GomokuPiece piece);
    // get current player based on history, black first
    GomokuPiece get_current_player() const;
    // player makes a move
    GomokuPiece move(int row, int col);
    // withdraw the last move
    std::pair<int, int> withdraw();
    // check and return the winner
    GomokuPiece check_winner();
};

#endif // GOMOKUCORE_H