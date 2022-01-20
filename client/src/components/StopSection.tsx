import { StopSearch } from './StopSearch';
import { StopResults } from './StopResults';
import { TransitSelect } from './TransitSelect';
import { FavouriteList } from './FavouriteList';
import { Box } from '@mui/material';

export const StopSection = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <TransitSelect sx={{ pb: 1.5 }} />
      <Box>
        <StopSearch />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <FavouriteList />
        <StopResults />
      </Box>
    </Box>
  );
};
