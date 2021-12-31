import React, { useState } from 'react';

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

export default function Control() {
  const { wasmModule, resetInstance, sendSigUpdate } = useWasmModule();
  // ui related hooks
  const smallScreen = useMediaQuery('(max-width:950px)');
  const [open, setOpen] = useState(false);

  const handleWithdraw = () => {
    wasmModule.instance.withdraw();
    sendSigUpdate();
  };

  const handleRestartConfirm = () => {
    resetInstance();
    sendSigUpdate();
    setOpen(false);
  };

  return (
    <Box margin={1}>

      <ButtonGroup
        orientation={smallScreen ? 'horizontal' : 'vertical'}
        // disableElevation
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
          onClick={() => setOpen(true)}
        >
          Restart
        </Button>

      </ButtonGroup>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
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
          <Button onClick={() => setOpen(false)} autoFocus>Cancel</Button>
          <Button
            onClick={handleRestartConfirm}
            color="warning"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}
