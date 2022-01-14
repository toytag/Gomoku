import React, { useEffect } from 'react';
// material-ui
import styled from '@mui/system/styled';
import IconButton from '@mui/material/IconButton';
import Fade from '@mui/material/Fade';
// redux
import { Piece, Move } from 'gomoku-core';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectGomoku, selectPiece, selectWinner, move,
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
  // const gomoku = useAppSelector(selectGomoku);
  const piece = useAppSelector(selectPiece(row, col));
  const winner = useAppSelector(selectWinner);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   console.log(gomoku.search());
  // }, []);

  return (
    <StyledIconButton
      onClick={() => {
        dispatch(move([row, col] as Move));
        // new Promise((resolve) => gomoku.search());
        // dispatch(searchAsync());
      }}
      disabled={piece !== Piece.EMPTY || winner !== Piece.EMPTY}
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
