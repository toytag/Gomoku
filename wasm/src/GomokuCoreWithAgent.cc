#include "GomokuCoreWithAgent.h"

GomokuPiece GomokuCoreWithAgent::move(const int row, const int col)
{
    GomokuPiece piece = GomokuCore::move(row, col);
    return piece;
}

int GomokuCoreWithAgent::evaluate()
{
    int score = 0;
    GomokuPiece current_player = get_current_player();
    // check horizontal
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        for (int j = 0; j < BOARD_SIZE; j++)
        {
            if (get_board_at(i, j) != GomokuPiece::EMPTY)
            {
                GomokuPiece tmp_player = get_board_at(i, j);
                // calculate score
                int start = j;
                while (get_board_at(i, j + 1) == tmp_player) j++;
                int end = j;
                int tmp_score = 1 << (end - start + 1);
                if (get_board_at(i, start - 1) == GomokuPiece::EMPTY) tmp_score <<= 1;
                if (get_board_at(i, end + 1) == GomokuPiece::EMPTY) tmp_score <<= 1;
                // add score
                score += tmp_player == current_player ? tmp_score : -tmp_score;
            }
        }
    }
    // check vertical
    for (int j = 0; j < BOARD_SIZE; j++)
    {
        for (int i = 0; i < BOARD_SIZE; i++)
        {
            if (get_board_at(i, j) != GomokuPiece::EMPTY)
            {
                GomokuPiece tmp_player = get_board_at(i, j);
                // calculate score
                int start = i;
                while (get_board_at(i + 1, j) == tmp_player) i++;
                int end = i;
                int tmp_score = 1 << (end - start + 1);
                if (get_board_at(start - 1, j) == GomokuPiece::EMPTY) tmp_score <<= 1;
                if (get_board_at(end + 1, j) == GomokuPiece::EMPTY) tmp_score <<= 1;
                // add score
                score += tmp_player == current_player ? tmp_score : -tmp_score;
            }
        }
    }
    // check diagonal
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        int j = BOARD_SIZE - 1 - i;
        for (int k = - std::min(i, j); k + std::max(i, j) < BOARD_SIZE; k++)
        {
            if (get_board_at(i + k, j + k) != GomokuPiece::EMPTY)
            {
                GomokuPiece tmp_player = get_board_at(i + k, j + k);
                // calculate score
                int start = k;
                while (get_board_at(i + k + 1, j + k + 1) == tmp_player) k++;
                int end = k;
                int tmp_score = 1 << (end - start + 1);
                if (get_board_at(i + start - 1, j + start - 1) == GomokuPiece::EMPTY) tmp_score <<= 1;
                if (get_board_at(i + end + 1, j + end + 1) == GomokuPiece::EMPTY) tmp_score <<= 1;
                // add score
                score += tmp_player == current_player ? tmp_score : -tmp_score;
            }
        }
    }
    // check anti-diagonal
    for (int i = 0; i < BOARD_SIZE; i++)
    {
        int j = i;
        for (int k = - std::min(i, BOARD_SIZE - 1 - j); k + std::max(i, BOARD_SIZE - 1 - j) < BOARD_SIZE; k++)
        {
            if (get_board_at(i + k, j - k) != GomokuPiece::EMPTY)
            {
                GomokuPiece tmp_player = get_board_at(i + k, j - k);
                // calculate score
                int start = k;
                while (get_board_at(i + k + 1, j - k - 1) == tmp_player) k++;
                int end = k;
                int tmp_score = 1 << (end - start + 1);
                if (get_board_at(i + start - 1, j - start + 1) == GomokuPiece::EMPTY) tmp_score <<= 1;
                if (get_board_at(i + end + 1, j - end - 1) == GomokuPiece::EMPTY) tmp_score <<= 1;
                // add score
                score += tmp_player == current_player ? tmp_score : -tmp_score;
            }
        }
    }
    return score;
}