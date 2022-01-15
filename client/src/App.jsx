import './App.css';
import React from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { StopSearch } from './components/StopSearch';
import { StopResults } from './components/StopResults';
import {
  setSearchResults,
  setAutocompleteResults,
} from './components/stopResultsSlice';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  function searchStop(name, autocomp) {
    const transit = 'o-c3x-edmontontransitservice';
    const key = process.env.REACT_APP_TRANSITLAND_KEY;
    axios
      .get(
        `https://transit.land/api/v2/rest/stops?api_key=${key}&served_by_onestop_ids=${transit}&search=${name}`
      )
      .then(function (res) {
        // set results to state
        if (autocomp) {
          dispatch(setAutocompleteResults(res.data.stops));
        } else {
          dispatch(setSearchResults(res.data.stops));
        }
      });
  }

  return (
    <main className="App">
      <h1>Transit App</h1>
      <Box sx={{ m: 1, display: 'flex', justifyContent: 'center' }}>
        <StopSearch onSearch={searchStop} />
        <StopResults />
      </Box>
    </main>
  );
}

export default App;
