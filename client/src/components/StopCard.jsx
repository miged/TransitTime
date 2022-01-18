import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, Typography, IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Cookies } from 'react-cookie';

export const StopCard = (props) => {
  const cookies = new Cookies();

  function addFavourite(stop_id, route_id) {
    // initialise cookie
    if (!cookies.get('favourites')) {
      cookies.set('favourites', []);
    }

    const faves = cookies.get('favourites');
    if (!faves.find((f) => f.route === route_id && f.stop === stop_id)) {
      // save to cookie
      faves.push({ stop: stop_id, route: route_id });
      cookies.set('favourites', faves);
    }

    console.log(cookies.get('favourites'));
  }

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
        <IconButton
          aria-label="fav"
          color="primary"
          onClick={() => addFavourite(props.stop_id, props.route_id)}
        >
          <StarBorderIcon />
        </IconButton>
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
