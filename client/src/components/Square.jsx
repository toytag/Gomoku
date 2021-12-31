import React, { useMemo } from 'react';

import styled from '@mui/material/styles/styled';
import IconButton from '@mui/material/IconButton';

import { useWasmModule } from '../utils/WasmModuleContext';

const StyledIconButton = styled(IconButton)({
  maxWidth: 55,
  maxHeight: 55,
  width: '100%',
  height: '100%',
  padding: '8%',
});

export default function Square({ value, onClick }) {
  const wasmModule = useWasmModule();

  const piece = useMemo(() => {
    switch (value) {
      case wasmModule.GomokuPiece.BLACK:
        return (<img src="Black.svg" alt="Black" width="100%" height="100%" />);
      case wasmModule.GomokuPiece.WHITE:
        return (<img src="White.svg" alt="White" width="100%" height="100%" />);
      default:
        return (<img src="Empty.svg" alt="Empty" width="100%" height="100%" />);
    }
  }, [value]);

  return (
    <StyledIconButton
      onClick={onClick}
      disabled={value !== wasmModule.GomokuPiece.EMPTY}
    >
      {piece}
    </StyledIconButton>
  );
}
