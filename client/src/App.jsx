import './App.css';
import { Box } from '@mui/material';
import { StopSearch } from './components/StopSearch';
import axios from 'axios';

function App() {
  function searchStop(name) {
    const transit = 'o-c3x-edmontontransitservice';
    const key = process.env.REACT_APP_TRANSITLAND_KEY;
    axios
      .get(
        `https://transit.land/api/v2/rest/stops?api_key=${key}&served_by_onestop_ids=${transit}&search=${name}`
      )
      .then(function (res) {
        console.log(res.data);
      });
  }

  return (
    <main className="App">
      <h1>Transit App</h1>
      <Box sx={{ m: 1, display: 'flex', justifyContent: 'center' }}>
        <StopSearch onSearch={searchStop} />
      </Box>
    </main>
  );
}

export default App;
