import React, { useEffect, useState } from 'react';

import styled from '@mui/system/styled';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';

import { useWasmModule } from '../utils/WasmModuleContext';

const StyledIconButton = styled(IconButton)({
  position: 'relative',
  padding: 0,
  maxWidth: 55,
  maxHeight: 55,
  width: '100%',
  height: '100%',
});

const StyledImg = styled('img')({
  width: '100%',
  height: '100%',
  padding: '8%',
  position: 'absolute',
  top: 0,
  left: 0,
});

export default function Square({ row, col }) {
  const wasmModule = useWasmModule();

  const [piece, setPiece] = useState(wasmModule.backend.get_board_at(row, col));

  useEffect(() => {
    wasmModule.board[row][col] = { piece, setPiece };
  }, [piece]);

  return (
    <StyledIconButton
      onClick={async () => {
        if (wasmModule.winner.winner === wasmModule.GomokuPiece.EMPTY) {
          setPiece(wasmModule.backend.move(row, col));
          // possible to put in to a promise to inprove ui responsiveness
          wasmModule.winner.setWinner(wasmModule.backend.check_winner());
        }
      }}
      disabled={piece !== wasmModule.GomokuPiece.EMPTY}
    >
      <Fade in={piece === wasmModule.GomokuPiece.EMPTY}>
        <StyledImg src="Empty.svg" alt="Empty" />
      </Fade>
      <Fade in={piece === wasmModule.GomokuPiece.BLACK}>
        <StyledImg src="Black.svg" alt="Black" />
      </Fade>
      <Fade in={piece === wasmModule.GomokuPiece.WHITE}>
        <StyledImg src="White.svg" alt="White" />
      </Fade>
    </StyledIconButton>
  );
}
