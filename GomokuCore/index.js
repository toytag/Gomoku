const Module = require('./build/Module.js');

Module.onRuntimeInitialized = () => {
    const gomoku = new Module.GomokuCore;
    console.log(gomoku.get_board_at(0, 0) === Module.GomokuPiece.EMPTY);
    gomoku.set_board_at(0, 0, Module.GomokuPiece.WHITE);
    gomoku.player_move(0, 0, Module.GomokuPiece.BLACK);
    gomoku.player_move(1, 0, Module.GomokuPiece.BLACK);
    gomoku.player_move(2, 0, Module.GomokuPiece.BLACK);
    gomoku.player_move(3, 0, Module.GomokuPiece.BLACK);
    gomoku.player_move(4, 0, Module.GomokuPiece.BLACK);
    console.log(gomoku.get_board_at(0, 0) === Module.GomokuPiece.WHITE);
    console.log(gomoku.check_winner() === Module.GomokuPiece.BLACK);
    console.log(gomoku.get_board());
};
