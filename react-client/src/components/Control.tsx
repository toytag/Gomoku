import React, { useEffect, useState } from 'react';
// material-ui
import styled from '@mui/system/styled';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// redux
import { GomokuPiece } from 'gomoku-core';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  selectWinner, withdraw, reset,
} from '../redux/backendSlice';

const StyledGreenText = styled('span')(({ theme }) => ({
  color: theme.palette.success.main,
}));

const StyledRedText = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function Control() {
  const winner = useAppSelector(selectWinner);
  // check if status === 'loaded' before using
  // const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();

  // ui related hooks
  const smallScreen = useMediaQuery('(max-width:950px)');
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);
  const [gameEndDialogOpen, setGameEndDialogOpen] = useState(false);
  useEffect(() => {
    setGameEndDialogOpen(winner !== GomokuPiece.EMPTY);
  }, [winner]);

  const handleWithdraw = () => dispatch(withdraw());
  const handleRestart = () => setRestartDialogOpen(true);
  const handleRestartCancel = () => setRestartDialogOpen(false);
  const handleRestartConfirm = () => {
    dispatch(reset());
    setRestartDialogOpen(false);
  };
  const handleGameEndContinue = () => setGameEndDialogOpen(false);

  return (
    <Box margin={1}>

      <ButtonGroup
        orientation={smallScreen ? 'horizontal' : 'vertical'}
      >

        <Button
          variant="contained"
          disabled
        >
          Hint
        </Button>

        <Button
          variant="contained"
          color="success"
          onClick={handleWithdraw}
          // disabled={status !== 'loaded'}
        >
          Withdraw
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleRestart}
          // disabled={status !== 'loaded'}
        >
          Restart
        </Button>

      </ButtonGroup>

      <Dialog
        open={restartDialogOpen}
        onClose={handleRestartCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Restart the game?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By confirming, you will lose all your progress.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRestartCancel} autoFocus>Cancel</Button>
          <Button
            onClick={handleRestartConfirm}
            color="warning"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={gameEndDialogOpen}
        onClose={handleGameEndContinue}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${winner === GomokuPiece.BLACK ? 'BLACK' : 'WHITE'} is the winner!`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Use the
            {' '}
            <StyledGreenText>WITHDRAW</StyledGreenText>
            {' '}
            button to revise your move or use the
            {' '}
            <StyledRedText>RESTART</StyledRedText>
            {' '}
            button to reset the game.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGameEndContinue} autoFocus>Continue</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
