import './App.css';
import { Box } from '@mui/material';
import { StopSearch } from './components/StopSearch';

function App() {
  return (
    <main className="App">
      <h1>Transit App</h1>
      <Box sx={{ m: 1, display: 'flex', justifyContent: 'center' }}>
        <StopSearch />
      </Box>
    </main>
  );
}

export default App;
