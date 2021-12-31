import React from 'react';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';

export default function CustomThemeProvider({ children }) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // based on atom one dark theme
  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
        ...(prefersDarkMode
          ? {
            common: {
              black: '#282C34',
              white: '#CFD7E6',
            },
            background: {
              default: '#282C34',
              paper: '#282C34',
            },
            primary: {
              // blue
              main: '#61AFEF',
            },
            warning: {
              // yellow
              main: '#E5C07B',
            },
            error: {
              // red
              main: '#E06C75',
            },
            success: {
              // green
              main: '#98C379',
            },
          }
          : {}
        ),
      },
    }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
