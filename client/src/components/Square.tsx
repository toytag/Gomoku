import React from 'react';
// material-ui
import styled from '@mui/system/styled';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
// redux
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectModule, selectPiece, selectWinner, move,
} from '../redux/wasmSlice';

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

export default function Square({ row, col } : { row: number, col: number }) {
  const wasmModule = useAppSelector(selectModule);
  const piece = useAppSelector(selectPiece(row, col));
  const winner = useAppSelector(selectWinner);
  const dispatch = useAppDispatch();

  return (
    <StyledIconButton
      onClick={async () => dispatch(move({ row, col }))}
      disabled={piece !== wasmModule.GomokuPiece.EMPTY || winner !== wasmModule.GomokuPiece.EMPTY}
      disableTouchRipple
    >
      <Fade in={piece === wasmModule.GomokuPiece.EMPTY}>
        <StyledImg src="assets/images/empty.svg" alt="empty" />
      </Fade>
      <Fade in={piece === wasmModule.GomokuPiece.BLACK}>
        <StyledImg src="assets/images/black.svg" alt="black" />
      </Fade>
      <Fade in={piece === wasmModule.GomokuPiece.WHITE}>
        <StyledImg src="assets/images/white.svg" alt="white" />
      </Fade>
    </StyledIconButton>
  );
}
