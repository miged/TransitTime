import './App.css';
import React from 'react';
import { StopSection } from './components/StopSection';
import { Header } from './components/Header';
import BusTimes from './components/BusTimes';
import { Box, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>(
    !prefersDarkMode ? 'dark' : 'light'
  );

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,
        },
      }),
    [mode]
  );

  const canvasColor = theme.palette.background.default;
  document.body.style.backgroundColor = canvasColor;

  return (
    <ThemeProvider theme={theme}>
      <main className="App">
        <Header colorMode={colorMode} />
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
