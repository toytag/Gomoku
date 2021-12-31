const createModule = require('./build/Module.js');

createModule().then(module => {
  const gomoku = new module.GomokuCore();
  console.log(gomoku.get_board_at(0, 0) === module.GomokuPiece.EMPTY);
  gomoku.set_board_at(0, 0, module.GomokuPiece.WHITE);
  gomoku.player_move(0, 0, module.GomokuPiece.BLACK);
  gomoku.player_move(1, 0, module.GomokuPiece.BLACK);
  gomoku.player_move(2, 0, module.GomokuPiece.BLACK);
  gomoku.player_move(3, 0, module.GomokuPiece.BLACK);
  gomoku.player_move(4, 0, module.GomokuPiece.BLACK);
  console.log(gomoku.get_board_at(0, 0) === module.GomokuPiece.WHITE);
  console.log(gomoku.check_winner() === module.GomokuPiece.BLACK);
  console.log(gomoku.get_board());
});