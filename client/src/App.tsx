import React from 'react';
// material-ui
import styled from '@mui/system/styled';
import Box from '@mui/material/Box';
// components
import CustomThemeProvider from './theme/CustomThemeProvider';
import AppBar from './components/AppBar';
import Board from './components/Board';
import Control from './components/Control';

const HeadWrapper = styled(Box)({
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

function App() {
  return (
    <CustomThemeProvider>
      <HeadWrapper>
        <AppBar />
      </HeadWrapper>

      <BodyWrapper>
        <Board />
        <Control />
      </BodyWrapper>
    </CustomThemeProvider>
  );
}

export default App;
