import { useAppSelector } from '../app/hooks';
import { StopCard } from './StopCard';
import { Typography } from '@mui/material';

interface Stop {
  id: number;
  stop_id: string;
  stop_name: string;
  route_stops: RouteStop[];
}

interface RouteStop {
  route: Route;
}

interface Route {
  route_id: string;
  route_short_name: string;
  route_long_name: string;
}

export const StopResults = () => {
  const stops = useAppSelector((state) => state.stopResults.searchResults);

  const results = stops.map((s: Stop) => {
    return s.route_stops.map((r: RouteStop) => {
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
