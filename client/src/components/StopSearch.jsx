import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Box, TextField, Button, Autocomplete } from '@mui/material';
import { setSearchResults, setAutocompleteResults } from './stopResultsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const StopSearch = (props) => {
  const dispatch = useDispatch();
  const autocomplete = useSelector(
    (state) => state.stopResults.autocompleteResults
  );
  const [stop, setStop] = React.useState('');
  const timeout = React.useRef();

  function searchStop(name, autocomp) {
    clearTimeout(timeout.current);
    const transit = 'o-c3x-edmontontransitservice';
    const key = process.env.REACT_APP_TRANSITLAND_KEY;
    const url = `https://transit.land/api/v2/rest/stops?api_key=${key}&served_by_onestop_ids=${transit}&search=${name}`;

    timeout.current = setTimeout(() => {
      if (name.length > 0) {
        axios.get(url).then((res) => {
          const stops = res.data.stops.filter((s) => {
            return s.stop_name.toLowerCase().includes(name.toLowerCase());
          });
          // set results to state
          if (autocomp) {
            dispatch(setAutocompleteResults([]));
            dispatch(setAutocompleteResults(res.data.stops));
          } else {
            dispatch(setSearchResults([]));
            dispatch(setSearchResults(stops));
          }
        });
      }
    }, 150);
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Autocomplete
        inputValue={stop}
        onInputChange={(event, newValue) => {
          setStop(newValue);
          searchStop(newValue, true);

          if (newValue.length === 0) {
            dispatch(setAutocompleteResults([]));
          }
        }}
        sx={{ width: 320 }}
        size="small"
        freeSolo
        options={autocomplete}
        getOptionLabel={(option) => option.stop_name}
        renderInput={(params) => <TextField {...params} label="Stop" />}
        filterOptions={(x) => x}
      />
      <Button
        sx={{ mx: 1, py: 1 }}
        variant="contained"
        disableElevation
        onClick={() => searchStop(stop, false)}
      >
        Search
      </Button>
    </Box>
  );
};

StopSearch.propTypes = {
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
};
