import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import { setSearchResults, setAutocompleteResults } from './stopResultsSlice';
import { useDispatch, useSelector } from 'react-redux';

export const StopSearch = (props) => {
  const dispatch = useDispatch();
  const autocomplete = useSelector(
    (state) => state.stopResults.autocompleteResults
  );
  const timeout = React.useRef();

  const [stop, setStop] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function searchStop(name, autocomp) {
    clearTimeout(timeout.current);
    const transit = 'o-c3x-edmontontransitservice';
    const key = process.env.REACT_APP_TRANSITLAND_KEY;
    const url = `https://transit.land/api/v2/rest/stops?api_key=${key}&served_by_onestop_ids=${transit}&search=${name}`;

    timeout.current = setTimeout(() => {
      if (name.length > 0) {
        axios.get(url).then((res) => {
          const stops = res.data.stops.filter((s) => {
            const stop_name = name.split('-')[0].toLowerCase().trim();
            return (
              s.stop_id.toLowerCase().includes(stop_name) ||
              s.stop_name.toLowerCase().includes(stop_name)
            );
          });
          // set results to state
          if (autocomp) {
            dispatch(setAutocompleteResults([]));
            dispatch(setAutocompleteResults(stops));
          } else {
            setLoading(false);
            dispatch(setSearchResults(stops));
          }
        });
      }
    }, 150);
  }

  return (
    <Box>
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
          sx={{ width: 360 }}
          size="small"
          freeSolo
          options={autocomplete}
          getOptionLabel={(o) => `${o.stop_id} - ${o.stop_name}`}
          renderInput={(params) => (
            <TextField {...params} label="Stop ID/Name" />
          )}
          filterOptions={(x) => x}
        />
        <Button
          sx={{ mx: 1, py: 1 }}
          variant="contained"
          disableElevation
          onClick={() => {
            setLoading(true);
            dispatch(setSearchResults([]));
            searchStop(stop, false);
          }}
        >
          Search
        </Button>
      </Box>
      {loading && <CircularProgress sx={{ my: 1 }} />}
    </Box>
  );
};

StopSearch.propTypes = {
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: undefined,
};
