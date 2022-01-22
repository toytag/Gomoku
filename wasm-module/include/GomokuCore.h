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

typedef std::pair<uint8_t, uint8_t> GomokuMove;

class GomokuCore
{
private:
    // gomoku board represented as a 1d array
    std::array<GomokuPiece, BOARD_SIZE * BOARD_SIZE> board{GomokuPiece::EMPTY};
    // history of moves
    std::stack<GomokuMove> history;
    // winner
    GomokuPiece winner{GomokuPiece::EMPTY};

protected:
    // set the piece at the given row and column
    void set_board_at(int row, int col, GomokuPiece piece);
    // push the given move to the history
    void push_move(int row, int col);
    // pop the last move from the history
    GomokuMove pop_move();
    // set the winner
    void set_winner(GomokuPiece winner);

public:
    // constructor
    GomokuCore() = default;
    // destructor
    ~GomokuCore() = default;

    // get the piece at the given row and column
    GomokuPiece get_board_at(int row, int col);
    // get current player based on history, black first
    GomokuPiece get_current_player();
    // get the last move
    GomokuMove get_last_move();
    // get the winner
    GomokuPiece get_winner();

    // player makes a move
    GomokuPiece move(int row, int col);
    // withdraw the last move
    GomokuMove withdraw();
};

#endif // GOMOKUCORE_H