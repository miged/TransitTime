import { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';

export interface Props {
  stop: string;
  route: string;
}

export default function NoBusTimes(props: Props) {
  const [noBus, setNoBus] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setNoBus(true);
    }, 5000);
  }, []);

  return !noBus ? (
    <>
      <CircularProgress sx={{ my: 1 }} />
      <Typography>Getting stop times...</Typography>
    </>
  ) : (
    <Typography>
      No buses were found for:
      <br />
      Stop: {props.stop}
      <br />
      Route: {props.route}
    </Typography>
  );
}
