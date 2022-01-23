import './App.css';
import React from 'react';
import { StopSection } from './components/StopSection';
import { Header } from './components/Header';
import BusTimes from './components/BusTimes';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from './theme';

function App() {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const canvasColor = theme.palette.background.default;
  document.body.style.backgroundColor = canvasColor;

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <main className="App">
        <Header colorMode={toggleColorMode} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'baseline',
            gap: 1,
          }}
        >
          <StopSection />
          <BusTimes />
        </Box>
      </main>
    </ThemeProvider>
  );
}

export default App;
