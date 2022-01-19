import React from 'react';
import PropTypes from 'prop-types';
import { Cookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { setFavourites } from '../app/stopResultsSlice';
import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export const FavouriteButton = (props) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const faveCookies = 'favourites';
  const [clicked, setClick] = React.useState(false);

  // initialise cookie
  if (!cookies.get(faveCookies)) {
    cookies.set(faveCookies, []);
  }

  React.useEffect(() => {
    if (isFavourited({ stop: props.id, route: props.route_id })) {
      setClick(true);
    }
  }, []);

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

  function favouriteClick(stop, route) {
    const fave = { stop, route };
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
      onClick={() => favouriteClick(props.id, props.route_id)}
    >
      {clicked ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};

FavouriteButton.propTypes = {
  id: PropTypes.number,
  route_id: PropTypes.string,
};
