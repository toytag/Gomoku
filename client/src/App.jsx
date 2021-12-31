import React, { useState } from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';

import { WasmModuleProvider } from './utils/WasmModuleContext';

import CustomThemeProvider from './CustomThemeProvider';
import Header from './components/Header';
import Board from './components/Board';
import Control from './components/Control';

const HeaderWrapper = styled(Box)({
  width: '100%',
  minHeight: '12.5vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const BodyWrapper = styled(Box)({
  width: '100%',
  minHeight: '72.5vh',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function App() {
  // pvp for player vs player, pvc for player vs computer
  const [mode, setMode] = useState('pvc');

  return (
    <CustomThemeProvider>

      <HeaderWrapper>
        <Header mode={mode} setMode={setMode} />
      </HeaderWrapper>

      <BodyWrapper>
        <WasmModuleProvider mode={mode}>
          <Board />
          <Control />
        </WasmModuleProvider>
      </BodyWrapper>

    </CustomThemeProvider>
  );
}
