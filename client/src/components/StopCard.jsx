import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Typography } from '@mui/material';
import { FavouriteButton } from './FavouriteButton';

export const StopCard = (props) => {
  return (
    <Card sx={{ width: 500, p: 2, ...props.sx }} variant="outlined">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ mr: 2, width: 50 }}>
          <Typography sx={{ fontSize: 24 }}>{props.route_id}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignContent: 'center',
            flexGrow: 1,
          }}
        >
          <Typography>
            {props.stop_name} ({props.stop_id})
          </Typography>
          <Typography>{props.route_name}</Typography>
        </Box>
        <FavouriteButton id={props.id} route_id={props.route_id} />
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
