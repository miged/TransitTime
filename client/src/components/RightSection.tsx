import { NearbyMap } from './NearbyMap';
import BusTimes from './BusTimes';
import { Paper } from '@mui/material';
import { useAppSelector } from '../app/hooks';

export const RightSection = () => {
  const pos = useAppSelector((state) => state.stopResults.location);
  return (
    <Paper sx={{ width: 650 }} elevation={1}>
      {pos.latitude !== 0 ? <NearbyMap /> : <BusTimes />}
    </Paper>
  );
};
