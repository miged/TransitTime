import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import { StopSearch } from './components/StopSearch';
import { StopResults } from './components/StopResults';

function App() {
  return (
    <main className="App">
      <h1>Transit App</h1>
      <Box sx={{ m: 1, display: 'flex', justifyContent: 'center' }}>
        <StopSearch />
        <StopResults />
      </Box>
    </main>
  );
}

export default App;
