import React from 'react';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const FavouriteButton = (props) => {
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

  function getFavourite() {
    //
  }

  function removeFavourite() {
    //
  }

  return (
    <IconButton
      aria-label="fav"
      color="primary"
      onClick={() => addFavourite(props.id, props.route_id)}
    >
      <StarBorderIcon />
    </IconButton>
  );
};

FavouriteButton.propTypes = {
  id: PropTypes.number,
  route_id: PropTypes.string,
};
