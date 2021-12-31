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
    WHITE = 2
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
    GomokuPiece get_board_at(uint8_t row, uint8_t col) const;
    // set the piece at the given row and column
    void set_board_at(uint8_t row, uint8_t col, GomokuPiece piece);
    // player makes a move
    void play(uint8_t row, uint8_t col);
    // withdraw the last move
    void withdraw();
    // check and return the winner
    GomokuPiece check_winner();
};

#endif // GOMOKUCORE_H