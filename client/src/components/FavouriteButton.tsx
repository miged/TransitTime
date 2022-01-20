/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Cookies } from 'react-cookie';
import { setFavourites } from '../app/stopResultsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

import { IconButton } from '@mui/material';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export interface Props {
  id?: number;
  stop_id: string;
  stop_name: string;
  route_id: string;
  route_num: string;
  route_name: string;
}

interface Favourite {
  stop_id: string;
  stop_name: string;
  route_id: string;
  route_num: string;
  route_name: string;
}

export const FavouriteButton = (props: Props) => {
  const faves = useAppSelector((state) => state.stopResults.favourites);
  const cookies = new Cookies();
  const dispatch = useAppDispatch();
  const faveCookies = 'favourites';
  const [clicked, setClick] = React.useState(false);
  const stopInfo: Favourite = {
    stop_id: props.stop_id,
    stop_name: props.stop_name,
    route_id: props.route_id,
    route_num: props.route_num,
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
      aria-label="fav"
      color="primary"
      onClick={() => favouriteClick(stopInfo)}
    >
      {clicked ? <StarIcon /> : <StarBorderIcon />}
    </IconButton>
  );
};
