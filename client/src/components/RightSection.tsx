import { NearbyMap } from './NearbyMap';
import BusTimes from './BusTimes';
import { Paper, Box } from '@mui/material';
import { useAppSelector } from '../app/hooks';

export const RightSection = () => {
  const pos = useAppSelector((state) => state.stopResults.location);
  return (
    <Paper sx={{ width: 650, maxHeight: '100%' }} elevation={1}>
      <Box
        sx={{
          width: 650,
          maxHeight: '100%',
          overflow: 'auto',
          position: 'fixed',
        }}
      >
        {pos.latitude !== 0 ? <NearbyMap /> : <BusTimes />}
      </Box>
    </Paper>
  );
};
