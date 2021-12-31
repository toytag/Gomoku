import React, { useEffect, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useWasmModule } from '../utils/WasmModuleContext';
import Square from './Square';

export default function Board() {
  const {
    wasmModule, sigUpdate, sendSigUpdate,
  } = useWasmModule();
  const board = useMemo(() => wasmModule.instance.get_board(), [sigUpdate]);
  const winner = useMemo(() => wasmModule.instance.check_winner(), [sigUpdate]);

  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(winner !== wasmModule.GomokuPiece.EMPTY);
  }, [winner]);

  return (
    <Paper
      elevation={12}
      overflow="hidden"
      sx={{
        position: 'relative',
        // default max board size is 800px by 800px
        maxWidth: 800,
        margin: 1,
        // set line-height to 0 to prevent the grid from being offset
        lineHeight: 0,
        // contain board
        overflow: 'hidden',
        borderRadius: '2%',
        // bg color same as board
        backgroundColor: '#DBB35B',
      }}
    >
      <img src="Board.svg" alt="Board" width="100%" height="100%" />
      {board.map((row_, i) => (
        row_.map((value_, j) => (
          <Box
            // eslint-disable-next-line react/no-array-index-key
            key={`${i}-${j}`}
            sx={{
              // absolute positioning, board size is originally 850px by 850px;
              // each square is 55px by 55px, 15 sqaures per row, that is 55px * 15 = 825px;
              // which leaves (850px - 825px) / 2 = 12.5px padding on each side.
              position: 'absolute',
              top: `${(i * 55 + 12.5) / 8.5}%`,
              left: `${(j * 55 + 12.5) / 8.5}%`,
              width: `${55 / 8.5}%`,
              height: `${55 / 8.5}%`,
            }}
          >
            <Square
              value={value_}
              onClick={() => {
                if (winner === wasmModule.GomokuPiece.EMPTY) {
                  wasmModule.instance.play(i, j);
                  sendSigUpdate();
                }
              }}
            />
          </Box>
        ))
      ))}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`${winner === wasmModule.GomokuPiece.BLACK ? 'BLACK' : 'WHITE'} is the winner!`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Use the green withdraw button to revise your move or
            <br />
            use restart button to reset the game.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} autoFocus>Continue</Button>
        </DialogActions>
      </Dialog>

    </Paper>
  );
}
