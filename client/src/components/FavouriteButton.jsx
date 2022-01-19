/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setFavourites } from '../app/stopResultsSlice';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export const FavouriteButton = (props) => {
  const faves = useSelector((state) => state.stopResults.favourites);
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const faveCookies = 'favourites';
  const [clicked, setClick] = React.useState(false);
  const stopInfo = {
    stop_id: props.stop_id,
    route_id: props.route_id,
    stop_name: props.stop_name,
    route_name: props.route_name,
  };

  // initialise cookie
  if (!cookies.get(faveCookies)) {
    cookies.set(faveCookies, []);
  }

  React.useEffect(() => {
    if (isFavourited(stopInfo)) {
      setClick(true);
    }
  }, [faves]);

  function addFavourite(fave) {
    const faves = cookies.get(faveCookies);
    faves.push(fave);
    cookies.set(faveCookies, faves);
    dispatch(setFavourites(faves));
  }

  function removeFavourite(fave) {
    const faves = cookies.get(faveCookies);
    const filtered = faves.filter(
      (f) => JSON.stringify(f) !== JSON.stringify(fave)
    );
    cookies.set(faveCookies, filtered);
    dispatch(setFavourites(filtered));
  }

  function isFavourited(fave) {
    const faves = cookies.get(faveCookies);
    return faves.find((f) => JSON.stringify(f) === JSON.stringify(fave));
  }

  function favouriteClick(fave) {
    setClick(!clicked);
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
      onClick={() => favouriteClick(stopInfo)}
    >
      {clicked ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};

FavouriteButton.propTypes = {
  id: PropTypes.number,
  stop_id: PropTypes.string,
  stop_name: PropTypes.string,
  route_id: PropTypes.string,
  route_name: PropTypes.string,
};
