import React from 'react';
import { useSelector } from 'react-redux';
import { StopCard } from './StopCard.tsx';
import { Typography } from '@mui/material';

export const StopResults = (props) => {
  const stops = useSelector((state) => state.stopResults.searchResults);

  const results = stops.map((s) => {
    return s.route_stops.map((r) => {
      return (
        <StopCard
          sx={{ my: 1 }}
          key={s.id + r.route.route_short_name}
          id={s.id}
          stop_id={s.stop_id}
          stop_name={s.stop_name}
          route_id={r.route.route_id}
          route_num={r.route.route_short_name}
          route_name={r.route.route_long_name}
        />
      );
    });
  });

  return (
    <>
      {results.length > 0 && <Typography>Results:</Typography>}
      {results}
    </>
  );
};
