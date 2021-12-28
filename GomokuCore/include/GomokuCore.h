#ifndef GOMOKUCORE_H
#define GOMOKUCORE_H

#include <array>
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

public:
    // constructor
    GomokuCore() = default;
    // destructor
    ~GomokuCore() = default;

    // get the piece at the given row and column
    GomokuPiece get_board_at(int row, int col) const;
    // set the piece at the given row and column
    void set_board_at(int row, int col, GomokuPiece piece);
    // player makes a move
    void player_move(int row, int col, GomokuPiece piece);
    // check and return the winner
    GomokuPiece check_winner();
};

#endif // GOMOKUCORE_H