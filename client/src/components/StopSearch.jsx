import React from 'react';
import PropTypes from 'prop-types';
import { Box, TextField, Button, Autocomplete } from '@mui/material';

export const StopSearch = (props) => {
  const [spot, setSpot] = React.useState('');

  // placeholder data
  const stops = [
    { label: 'Markham Rd' },
    { label: 'Kingston Rd' },
    { label: 'Lawrence Ave' },
  ];

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Autocomplete
        inputValue={spot}
        onInputChange={(event, newValue) => {
          setSpot(newValue);
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
        onClick={() => props.onSearch(spot)}
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
