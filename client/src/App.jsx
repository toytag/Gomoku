import React from 'react';

import styled from '@mui/system/styled';
import Box from '@mui/material/Box';

import { WasmModuleProvider } from './utils/WasmModuleContext';
import CustomThemeProvider from './CustomThemeProvider';
import Header from './components/Header';
import Board from './components/Board';
import Control from './components/Control';

const HeaderWrapper = styled(Box)({
  width: '100%',
  minHeight: '12.5vh',
  paddingTop: '2.5vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

const BodyWrapper = styled(Box)({
  width: '100%',
  minHeight: '70vh',
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
