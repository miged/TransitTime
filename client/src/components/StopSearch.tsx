import React from 'react';
import axios from 'axios';
import {
  Box,
  TextField,
  Button,
  Autocomplete,
  CircularProgress,
} from '@mui/material';
import {
  setSearchResults,
  setAutocompleteResults,
} from '../app/stopResultsSlice';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { StopSearchNearby } from './StopSearchNearby';

export interface Props {
  sx?: Object;
  onClick?: Function;
}

interface Stop {
  stop_id: string;
  stop_name: string;
}

export const StopSearch = (props: Props) => {
  const dispatch = useAppDispatch();
  const autocomplete = useAppSelector(
    (state) => state.stopResults.autocompleteResults
  );
  const transit = useAppSelector((state) => state.transit.id);
  const timeout = React.useRef<any>();

  const [stop, setStop] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  function searchStop(name: String, autocomp: Boolean) {
    clearTimeout(timeout.current);
    const key = process.env.REACT_APP_TRANSITLAND_KEY;
    const url = `https://transit.land/api/v2/rest/stops?api_key=${key}&served_by_onestop_ids=${transit}&search=${name}`;

    timeout.current = setTimeout(() => {
      if (name.length > 0) {
        axios.get(url).then((res) => {
          const stops = res.data.stops.filter((s: Stop) => {
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

  function searchClick() {
    if (stop.length !== 0) {
      setLoading(true);
      dispatch(setSearchResults([]));
      searchStop(stop, false);
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Autocomplete
          sx={{ width: 370 }}
          inputValue={stop}
          onInputChange={(event, newValue) => {
            setStop(newValue);
            searchStop(newValue, true);

            if (newValue.length === 0) {
              dispatch(setAutocompleteResults([]));
            }
          }}
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
          onClick={searchClick}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ my: 1 }}>
        <StopSearchNearby setLoading={setLoading} />
      </Box>
      {loading && <CircularProgress sx={{ my: 1 }} />}
    </Box>
  );
};
