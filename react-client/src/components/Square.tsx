import React from 'react';
// material-ui
import styled from '@mui/system/styled';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
// redux
import { Piece } from 'gomoku-core';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectPiece, selectWinner, selectStatus, moveAsync, counterMoveAsync,
} from '../redux/backendSlice';

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
  const piece = useAppSelector(selectPiece(row, col));
  const winner = useAppSelector(selectWinner);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  return (
    <StyledIconButton
      onClick={async () => {
        await dispatch(moveAsync([row, col]));
        await dispatch(counterMoveAsync());
      }}
      disabled={piece !== Piece.EMPTY || winner !== Piece.EMPTY || status !== 'idle'}
      disableTouchRipple
    >
      <Fade in={piece === Piece.EMPTY}>
        <StyledImg src="assets/images/empty.svg" alt="empty" />
      </Fade>
      <Fade in={piece === Piece.BLACK}>
        <StyledImg src="assets/images/black.svg" alt="black" />
      </Fade>
      <Fade in={piece === Piece.WHITE}>
        <StyledImg src="assets/images/white.svg" alt="white" />
      </Fade>
    </StyledIconButton>
  );
}
