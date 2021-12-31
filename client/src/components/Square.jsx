import React from 'react';

import styled from '@mui/material/styles/styled';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';

import { useWasmModule } from '../utils/WasmModuleContext';

const StyledIconButton = styled(IconButton)({
  maxWidth: 55,
  maxHeight: 55,
  width: '100%',
  height: '100%',
  padding: '8%',
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
        <img
          src="Empty.svg"
          alt="Empty"
          width="100%"
          height="100%"
          style={{
            display: value === wasmModule.GomokuPiece.EMPTY ? 'block' : 'none',
          }}
        />
      </Fade>
      <Fade in={value === wasmModule.GomokuPiece.BLACK}>
        <img
          src="Black.svg"
          alt="Black"
          width="100%"
          height="100%"
          style={{
            display: value === wasmModule.GomokuPiece.BLACK ? 'block' : 'none',
          }}
        />
      </Fade>
      <Fade in={value === wasmModule.GomokuPiece.WHITE}>
        <img
          src="Empty.svg"
          alt="Empty"
          width="100%"
          height="100%"
          style={{
            display: value === wasmModule.GomokuPiece.WHITE ? 'block' : 'none',
          }}
        />
      </Fade>
    </StyledIconButton>
  );
}
