import React from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, Box } from '@mui/material';

export const StopCard = (props) => {
  console.log(props);
  return (
    <Card sx={{ width: 400, p: 2, ...props.sx }} variant="outlined">
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ mr: 2, width: 40 }}>
          <Typography sx={{ fontSize: 24 }}>{props.route_id}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignContent: 'center',
          }}
        >
          <Typography>{props.stop_name}</Typography>
          <Typography>{props.route_name}</Typography>
        </Box>
      </Box>
    </Card>
  );
};

StopCard.propTypes = {
  stop_id: PropTypes.string,
  stop_name: PropTypes.string,
  route_id: PropTypes.string,
  route_name: PropTypes.string,
  next_times: PropTypes.array,
};
