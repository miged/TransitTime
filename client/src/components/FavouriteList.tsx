import React from 'react';
import { useCookies } from 'react-cookie';
import { Box } from '@mui/material';
import { StopCard } from './StopCard';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setFavourites } from '../app/stopResultsSlice';

export const FavouriteList = () => {
  const [load, setLoad] = React.useState(false);
  const dispatch = useAppDispatch();
  const [cookies] = useCookies(['favourites']);
  const faves = useAppSelector((state) => state.stopResults.favourites);

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

  return <Box>{results}</Box>;
};
