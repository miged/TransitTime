/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Cookies } from 'react-cookie';
import { setFavourites } from '../app/stopResultsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export interface Favourite {
  stop_id: string;
  stop_name: string;
  route_id: string;
  route_num: string;
  route_name: string;
  agency: string;
}

export const FavouriteButton = (props: Favourite) => {
  const [clicked, setClick] = React.useState(false);
  const faves = useAppSelector((state) => state.stopResults.favourites);
  const dispatch = useAppDispatch();

  const cookies = new Cookies();
  const faveCookies = 'favourites';
  const stopInfo: Favourite = { ...props };

  // initialise cookie
  if (!cookies.get(faveCookies)) {
    cookies.set(faveCookies, []);
  }

  React.useEffect(() => {
    if (isFavourited(stopInfo)) {
      setClick(true);
    }
  }, [faves]);

  function addFavourite(fave: Favourite) {
    const faves = cookies.get(faveCookies);
    faves.push(fave);
    cookies.set(faveCookies, faves);
    dispatch(setFavourites(faves));
  }

  function removeFavourite(fave: Favourite) {
    const faves = cookies.get(faveCookies);
    const filtered = faves.filter(
      (f: Favourite) => JSON.stringify(f) !== JSON.stringify(fave)
    );
    cookies.set(faveCookies, filtered);
    dispatch(setFavourites(filtered));
  }

  function isFavourited(fave: Favourite) {
    const faves = cookies.get(faveCookies);
    return faves.find(
      (f: Favourite) => JSON.stringify(f) === JSON.stringify(fave)
    );
  }

  function favouriteClick(fave: Favourite) {
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
      color="primary"
      onClick={() => favouriteClick(stopInfo)}
      aria-label="Favourite"
    >
      {clicked ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};
