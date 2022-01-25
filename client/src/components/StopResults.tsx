import { useAppSelector } from '../app/hooks';
import { StopCard } from './StopCard';
import { Box, Typography } from '@mui/material';

interface Stop {
  id: number;
  stop_id: string;
  stop_code: string;
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
  agency: any;
}

export const StopResults = () => {
  const stops = useAppSelector((state) => state.stopResults.searchResults);
  const maxResults = 50;
  let count = 0;

  const results = stops.map((s: Stop) => {
    return s.route_stops.map((r: RouteStop) => {
      if (count !== maxResults) {
        count += 1;
        return (
          <StopCard
            sx={{ my: 1 }}
            key={s.id + r.route.route_short_name}
            stop_id={s.stop_id}
            stop_code={s.stop_code}
            stop_name={s.stop_name}
            route_id={r.route.route_id}
            route_num={r.route.route_short_name}
            route_name={r.route.route_long_name}
            agency={r.route.agency.onestop_id}
          />
        );
      } else {
        return null;
      }
    });
  });

  console.log(results);

  return (
    <Box>
      {results.length > 0 && (
        <Typography>
          {count} {count === 1 ? 'Result' : 'Results'}:
        </Typography>
      )}
      {results}
    </Box>
  );
};
