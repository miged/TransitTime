import React from 'react';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const FavouriteButton = (props) => {
  const cookies = new Cookies();

  function addFavourite(fave) {
    const faves = cookies.get('favourites');

    // save to cookie
    faves.push(fave);
    cookies.set('favourites', faves);
  }

  function removeFavourite(fave) {
    const faves = cookies.get('favourites');
    const filtered = faves.filter((f) => {
      return JSON.stringify(f) !== JSON.stringify(fave);
    });
    cookies.set('favourites', filtered);
  }

  function favouriteClick(stop, route) {
    // initialise cookie
    if (!cookies.get('favourites')) {
      cookies.set('favourites', []);
    }

    const faves = cookies.get('favourites');
    const fave = { stop, route };

    if (!faves.find((f) => JSON.stringify(f) === JSON.stringify(fave))) {
      addFavourite(fave);
    } else {
      removeFavourite(fave);
    }

    console.log(cookies.get('favourites'));
  }

  return (
    <IconButton
      aria-label="fav"
      color="primary"
      onClick={() => favouriteClick(props.id, props.route_id)}
    >
      <StarBorderIcon />
    </IconButton>
  );
};

FavouriteButton.propTypes = {
  id: PropTypes.number,
  route_id: PropTypes.string,
};
