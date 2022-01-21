import { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';

export default function NoBusTimes(props) {
  const [noBus, setNoBus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNoBus(true);
    }, 5000);
  }, []);

  return !noBus ? (
    <CircularProgress sx={{ my: 1 }} />
  ) : (
    <Typography> No Buses were found at this stop for this Route </Typography>
  );
}
