import React, { useEffect, useState } from 'react';

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

import { useWasmModule } from '../utils/WasmModuleContext';

const StyledGreenText = styled('span')(({ theme }) => ({
  color: theme.palette.success.main,
}));

const StyledRedText = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
}));

export default function Control() {
  const wasmModule = useWasmModule();
  // record the winner
  const [winner, setWinner] = useState(wasmModule.GomokuPiece.EMPTY);
  useEffect(() => {
    wasmModule.winner = { winner, setWinner };
  }, [winner]);

  // ui related hooks
  const smallScreen = useMediaQuery('(max-width:950px)');
  const [restartDialogOpen, setRestartDialogOpen] = useState(false);
  const [gameEndDialogOpen, setGameEndDialogOpen] = useState(false);
  useEffect(() => {
    setGameEndDialogOpen(winner !== wasmModule.GomokuPiece.EMPTY);
  }, [winner]);

  const handleWithdraw = () => {
    const [row, col] = wasmModule.backend.withdraw();
    if (row !== -1 && col !== -1) {
      wasmModule.board[row][col].setPiece(wasmModule.GomokuPiece.EMPTY);
    }
  };
  const handleRestart = () => setRestartDialogOpen(true);
  const handleRestartCancel = () => setRestartDialogOpen(false);
  const handleRestartConfirm = () => {
    wasmModule.backend = new wasmModule.GomokuCoreWithAgent();
    wasmModule.board.forEach(
      (row) => row.forEach(
        ({ setPiece }) => setPiece(wasmModule.GomokuPiece.EMPTY),
      ),
    );
    wasmModule.winner.setWinner(wasmModule.GomokuPiece.EMPTY);
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
        >
          Withdraw
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleRestart}
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
          {`${winner === wasmModule.GomokuPiece.BLACK ? 'BLACK' : 'WHITE'} is the winner!`}
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
