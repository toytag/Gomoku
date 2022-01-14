import React, { useEffect } from 'react';
// material-ui
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
// redux
// import { useAppDispatch, useAppSelector } from '../redux/hooks';
// import { selectStatus, initAsync } from '../redux/backendSlice';
import { Piece, GomokuCore } from 'gomoku-core';
// components
import Square from './Square';

export default function Board() {
  // const status = useAppSelector(selectStatus);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(initAsync());
  // }, []);

  return (
    <Paper
      elevation={12}
      sx={{
        position: 'relative',
        // default max board size is 800px by 800px
        maxWidth: 800,
        margin: 1,
        // set line-height to 0 to prevent the grid from being offset
        lineHeight: 0,
        // contain board
        overflow: 'hidden',
        borderRadius: '2%',
        // bg color same as board
        backgroundColor: '#DBB35B',
      }}
    >
      <img src="assets/images/board.svg" alt="board" width="100%" height="100%" />
      {Array(GomokuCore.BOARD_SIZE).fill(Piece.EMPTY)
        .map(() => Array(GomokuCore.BOARD_SIZE).fill(Piece.EMPTY))
        .map((row_: any[], i: number) => (
          row_.map((_, j: number) => (
            <Box
              // eslint-disable-next-line react/no-array-index-key
              key={`${i}-${j}`}
              sx={{
                // absolute positioning, board size is originally 850px by 850px;
                // each square is 55px by 55px, 15 sqaures per row, that is 55px * 15 = 825px;
                // which leaves (850px - 825px) / 2 = 12.5px padding on each side.
                position: 'absolute',
                top: `${(i * 55 + 12.5) / 8.5}%`,
                left: `${(j * 55 + 12.5) / 8.5}%`,
                width: `${55 / 8.5}%`,
                height: `${55 / 8.5}%`,
              }}
            >
              <Square row={i} col={j} />
            </Box>
          ))
        ))}
    </Paper>
  );
}
