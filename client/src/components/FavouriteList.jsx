import React, { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setFavourites } from '../app/stopResultsSlice';
import { StopCard } from './StopCard';

export const FavouriteList = (props) => {
  const dispatch = useDispatch();
  const [cookies] = useCookies(['favourites']);
  const faves = useSelector((state) => state.stopResults.favourites);

  if (faves.length === 0 && cookies.favourites?.length > 0) {
    dispatch(setFavourites(cookies.favourites));
  }

  const results = faves.map((f) => {
    return `(${f.stop} - ${f.route})`;
  });

  console.log('faves', results);

  return <>{results}</>;
};
