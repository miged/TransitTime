import React from 'react';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';

export const FavouriteButton = (props) => {
  const cookies = new Cookies();
  const faveCookies = 'favourites';

  function addFavourite(fave) {
    const faves = cookies.get(faveCookies);
    faves.push(fave);
    cookies.set(faveCookies, faves);
  }

  function removeFavourite(fave) {
    const faves = cookies.get(faveCookies);
    const filtered = faves.filter(
      (f) => JSON.stringify(f) !== JSON.stringify(fave)
    );
    cookies.set(faveCookies, filtered);
  }

  function isFavourited(fave) {
    const faves = cookies.get(faveCookies);
    return faves.find((f) => JSON.stringify(f) === JSON.stringify(fave));
  }

  function favouriteClick(stop, route) {
    // initialise cookie
    if (!cookies.get(faveCookies)) {
      cookies.set(faveCookies, []);
    }

    const fave = { stop, route };
    if (!isFavourited(fave)) {
      addFavourite(fave);
    } else {
      removeFavourite(fave);
    }

    console.log(cookies.get(faveCookies));
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
