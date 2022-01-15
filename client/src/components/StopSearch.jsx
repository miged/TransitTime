import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Box, TextField, Button, Autocomplete } from '@mui/material';

export const StopSearch = (props) => {
  const results = useSelector((state) => state.stopResults.value);
  const [stop, setstop] = React.useState('');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Autocomplete
        inputValue={stop}
        onInputChange={(event, newValue) => {
          props.onSearch(stop);
          setstop(newValue);
        }}
        sx={{ width: 320 }}
        size="small"
        freeSolo
        options={results}
        getOptionLabel={(option) => option.stop_name}
        renderInput={(params) => <TextField {...params} label="Stop" />}
        filterOptions={(x) => x}
      />
      <Button
        sx={{ mx: 1, py: 1 }}
        variant="contained"
        disableElevation
        onClick={() => props.onSearch(stop)}
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
