import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, Autocomplete } from '@mui/material';

export const StopSearch = (props) => {
  const [stop, setstop] = React.useState('');

  // placeholder data
  const stops = [
    { label: 'Markham Rd' },
    { label: 'Kingston Rd' },
    { label: 'Lawrence Ave' },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Autocomplete
        inputValue={stop}
        onInputChange={(event, newValue) => {
          setstop(newValue);
        }}
        sx={{ width: 250 }}
        size="small"
        freeSolo
        options={stops}
        renderInput={(params) => <TextField {...params} label="Stop" />}
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
