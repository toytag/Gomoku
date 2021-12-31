import React from 'react';
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
  maxHeight: '87.5vh',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function App() {
  return (
    <CustomThemeProvider>

      <WasmModuleProvider>

        <HeaderWrapper>
          <Header />
        </HeaderWrapper>

        <BodyWrapper>
          <Board />
          <Control />
        </BodyWrapper>

      </WasmModuleProvider>

    </CustomThemeProvider>
  );
}
