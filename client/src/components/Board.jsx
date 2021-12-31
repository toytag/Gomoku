import React, { useMemo } from 'react';

import Box from '@mui/material/Box';

import { useWasmModule } from '../utils/WasmModuleContext';
import Square from './Square';

export default function Board() {
  const { wasmModule, sigUpdate, sendSigUpdate } = useWasmModule();
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
                wasmModule.instance.play(i, j);
                sendSigUpdate();
              }}
            />
          </Box>
        ))
      ))}
    </Box>
  );
}
