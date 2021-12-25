#ifndef GOMOKUCORE_H
#define GOMOKUCORE_H


#include <array>
#include <cstdint>


class GomokuCore 
{
  private:
    // maximum depth for minimax algorithm
    static constexpr uint8_t MAX_DEPTH = 5;
    // gomoku board size is usually 15x15
    static constexpr uint8_t BOARD_SIZE = 15;

  public:
    enum class Piece : uint8_t
    {
      EMPTY = 0,
      // player is black, black goes first
      BLACK = 1,
      // computer is white, white goes second
      WHITE = 2
    };
    std::array<std::array<uint8_t, BOARD_SIZE>, BOARD_SIZE> board{0};

    // constructor
    GomokuCore();
    // destructor
    ~GomokuCore();

    // void player_move(uint8_t x, uint8_t y);
    // int check_winner();
};


#endif // GOMOKUCORE_H