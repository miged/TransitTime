import { useAppSelector } from '../app/hooks';
import { StopCard } from './StopCard';
import { Box, Typography } from '@mui/material';

export const StopResults = () => {
  const stops = useAppSelector((state) => state.stopResults.searchResults);
  const maxResults = 50;
  let count = 0;

  const results = stops.map((s) => {
    return s.route_stops.map((r) => {
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
