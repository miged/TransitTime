import { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

export default function NoBusTimes(props) {

  const [noBus, setNoBus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNoBus(true);
    }, 5000);
  }, []);

  return !noBus ? (
    <Box sx={{ display: 'flex' }}>
      {props.stop_id && <CircularProgress sx={{ my: 1 }} />}
    </Box>
  ) : <Typography> No Buses were found at this stop for this Route </Typography>
};