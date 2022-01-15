import React from 'react';
// material-ui
import useMediaQuery from '@mui/material/useMediaQuery';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
// redux
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectMode, setMode } from '../redux/backendSlice';

export default function AppBar() {
  // pvp for player vs player, pvc for player vs computer
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();
  // ui related hooks
  const sm = useMediaQuery(('(min-width:600px)'));

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
            dispatch(setMode(newMode));
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
        <ToggleButton value="pve">
          <Tooltip title="Play against simple AI">
            <DeveloperBoardIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
