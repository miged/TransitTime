import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import { StopSearch } from './components/StopSearch';
import { StopResults } from './components/StopResults';
import { TransitSelect } from './components/TransitSelect';

function App() {
  return (
    <main className="App">
      <h1>Transit App</h1>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <TransitSelect sx={{ pb: 1.5 }} />
        <Box>
          <StopSearch />
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <StopResults />
      </Box>
    </main>
  );
}

export default App;
