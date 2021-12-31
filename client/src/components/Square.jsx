import React, { useMemo } from 'react';

import styled from '@mui/material/styles/styled';
import IconButton from '@mui/material/IconButton';
import Grow from '@mui/material/Grow';

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
      <Grow in={value === wasmModule.GomokuPiece.EMPTY}>
        <img
          src="Empty.svg"
          alt="Empty"
          width="100%"
          height="100%"
          style={{
            display: value === wasmModule.GomokuPiece.EMPTY ? 'block' : 'none',
          }}
        />
      </Grow>
      <Grow in={value === wasmModule.GomokuPiece.BLACK}>
        <img
          src="Black.svg"
          alt="Black"
          width="100%"
          height="100%"
          style={{
            display: value === wasmModule.GomokuPiece.BLACK ? 'block' : 'none',
          }}
        />
      </Grow>
      <Grow in={value === wasmModule.GomokuPiece.WHITE}>
        <img
          src="Empty.svg"
          alt="Empty"
          width="100%"
          height="100%"
          style={{
            display: value === wasmModule.GomokuPiece.WHITE ? 'block' : 'none',
          }}
        />
      </Grow>
    </StyledIconButton>
  );
}
