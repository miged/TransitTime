import './App.css';
import React from 'react';
import { StopSection } from './components/StopSection';
import BusTimes from './components/BusTimes';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode]
  );
  const canvasColor = theme.palette.background.default;
  document.body.style.backgroundColor = canvasColor;

  return (
    <ThemeProvider theme={theme}>
      <main className="App">
        <Typography
          sx={{
            py: 2,
            fontSize: 32,
            fontWeight: 'bold',
            color: theme.palette.text.primary,
          }}
        >
          TransitTime
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <StopSection />
          <Box
            sx={{
              pl: 2,
            }}
          >
            <BusTimes />
          </Box>
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default App;
