import React from 'react';

import styled from '@mui/material/styles/styled';
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

export default function Square({ value, onClick }) {
  const { wasmModule } = useWasmModule();

  return (
    <StyledIconButton
      onClick={onClick}
      disabled={value !== wasmModule.GomokuPiece.EMPTY}
      // disableFocusRipple
    >
      <Fade in={value === wasmModule.GomokuPiece.EMPTY}>
        <StyledImg src="Empty.svg" alt="Empty" />
      </Fade>
      <Fade in={value === wasmModule.GomokuPiece.BLACK}>
        <StyledImg src="Black.svg" alt="Black" />
      </Fade>
      <Fade in={value === wasmModule.GomokuPiece.WHITE}>
        <StyledImg src="White.svg" alt="White" />
      </Fade>
    </StyledIconButton>
  );
}
