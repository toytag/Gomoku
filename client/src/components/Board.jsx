import React, { useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import { useWasmModule } from '../utils/WasmModuleContext';
import Square from './Square';

export default function Board() {
  const wasmModule = useWasmModule();

  const board = wasmModule.instance.get_board().map((row_) => (
    row_.map((value_) => {
      const [value, setValue] = useState(value_);
      return { value, setValue };
    })
  ));

  return (
    <Box
      position="relative"
      sx={{
        display: 'inline-flex',
        // backgroundImage: "url('Board.svg')",
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'contain',
        maxWidth: 800,
        margin: 1,
      }}
    >
      <img src="Board.svg" alt="Board" width="100%" height="100%" />
      {board.map((row_, i) => (
        row_.map(({ value, setValue }, j) => (
          // eslint-disable-next-line react/no-array-index-key
          <Box key={`${i}-${j}`} position="absolute" top="1.5625%" left="1.5625">
            <Square value={value} onClick={() => setValue(wasmModule.instance.play(i, j))} />
          </Box>
        ))
      ))}
      {/* <Grid
        container
        direction="column"
        // padding: '1.5625%'
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
