import React, { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';

import { useWasmModule } from '../utils/WasmModuleContext';
import Square from './Square';

export default function Board() {
  const { wasmModule, sigUpdate, sendSigUpdate } = useWasmModule();

  // const board = wasmModule.instance.get_board().map((row_) => (
  //   row_.map((value_) => {
  //     const [value, setValue] = useState(value_);
  //     return { value, setValue };
  //   })
  // ));

  // const winner = useMemo()
  const board = useMemo(() => wasmModule.instance.get_board(), [sigUpdate]);

  return (
    <Box
      sx={{
        position: 'relative',
        // default max board size is 800px by 800px
        maxWidth: 800,
        margin: 1,
        // set line-height to 0 to prevent the grid from being offset
        lineHeight: 0,
      }}
    >
      <img src="Board.svg" alt="Board" width="100%" height="100%" />
      {board.map((row_, i) => (
        row_.map((value_, j) => (
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
            <Square
              value={value_}
              onClick={() => {
                wasmModule.instance.set_board_at(i, j, wasmModule.GomokuPiece.BLACK);
                sendSigUpdate();
              }}
            />
          </Box>
        ))
      ))}
      {/* <Grid
        container
        direction="column"
        padding="1.5625%"
        // width="100%"
        // height="100%"
        // lineHeight="1"
      >
        {board.map((row_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Grid container item key={i}>
            {row_.map(({ value, setValue }, j) => (
              // eslint-disable-next-line react/no-array-index-key
              <Grid item key={j} xs>
                <Square
                  value={value}
                  onClick={() => {
                    wasmModule.instance.set_board_at(i, j, wasmModule.GomokuPiece.BLACK);
                    setValue(wasmModule.GomokuPiece.BLACK);
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid> */}
    </Box>
  );
}
