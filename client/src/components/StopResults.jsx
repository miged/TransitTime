import React from 'react';
import { useSelector } from 'react-redux';
import { StopCard } from './StopCard';

export const StopResults = (props) => {
  const stops = useSelector((state) => state.stopResults.searchResults);
  console.log(stops);

  const results = stops.map((s) => {
    return s.route_stops.map((r) => {
      return (
        <StopCard
          sx={{ my: 1 }}
          key={s.id}
          stop_name={s.stop_name}
          route_id={r.route.route_short_name}
          route_name={r.route.route_long_name}
        />
      );
    });
  });

  return <>{results}</>;
};
