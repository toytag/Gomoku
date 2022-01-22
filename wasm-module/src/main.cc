// #include "GomokuCore.h"
#include "GomokuCoreWithAgent.h"

#include <iostream>

int main()
{
    GomokuCoreWithAgent gomoku;
    gomoku.move(0, 0);
    std::cout << gomoku.search() << std::endl;
    return 0;
}