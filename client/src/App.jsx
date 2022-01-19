import './App.css';
import React from 'react';
import { Box } from '@mui/material';
import { StopSearch } from './components/StopSearch';
import { StopResults } from './components/StopResults';
import { TransitSelect } from './components/TransitSelect';
import { FavouriteList } from './components/FavouriteList';
import BusTimes from './components/BusTimes';

function App() {
  return (
    <main className="App">
      <h1>Transit App</h1>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}
      >
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
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <FavouriteList />
            <StopResults />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'row',
          }}
        >
          <BusTimes />
        </Box>
      </Box>
    </main>
  );
}

export default App;
