import React, { useEffect, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';

import { useWasmModule } from '../utils/WasmModuleContext';

export default function Header() {
  const wasmModule = useWasmModule();
  // pvp for player vs player, pvc for player vs computer
  const [mode, setMode] = useState('pvp');
  // ui related hooks
  const sm = useMediaQuery(('(min-width:600px)'));

  useEffect(() => {
    wasmModule.mode = mode;
  }, [mode]);

  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Roboto',
          fontSize: { xs: '2.5rem', sm: '4rem' },
          fontWeight: 'Bold',
          paddingRight: { xs: '1.5rem', sm: '2rem' },
        }}
      >
        Gomoku
      </Typography>

      <ToggleButtonGroup
        value={mode}
        onChange={(event, newMode) => {
          if (newMode !== null) {
            setMode(newMode);
          }
        }}
        size={sm ? 'medium' : 'small'}
        color="info"
        exclusive
      >
        <ToggleButton value="pvp">
          <Tooltip title="Play with friends">
            <AccountCircleIcon />
          </Tooltip>
        </ToggleButton>
        <ToggleButton value="pvc" disabled>
          <Tooltip title="Play against simple AI">
            <DeveloperBoardIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
