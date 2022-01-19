import React from 'react';
import { useCookies } from 'react-cookie';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setFavourites } from '../app/stopResultsSlice.ts';
import { StopCard } from './StopCard.tsx';

export const FavouriteList = (props) => {
  const [load, setLoad] = React.useState(false);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['favourites']);
  const faves = useSelector((state) => state.stopResults.favourites);

  if (!load) {
    cookies.favourites && dispatch(setFavourites(cookies.favourites));
    setLoad(true);
  }

  const results = faves.map((f) => {
    return (
      <StopCard
        sx={{ my: 1 }}
        key={f.stop_id + f.route_id}
        stop_id={f.stop_id}
        stop_name={f.stop_name}
        route_id={f.route_id}
        route_num={f.route_num}
        route_name={f.route_name}
      />
    );
  });

  return (
    <>
      {results.length > 0 && <Typography>Favorites:</Typography>}
      {results}
    </>
  );
};
