import { CircularProgress, Typography } from '@mui/material';

export interface Props {
  stop: string;
  route: string;
  loading: boolean;
}

export default function NoBusTimes(props: Props) {
  return props.loading ? (
    <>
      <CircularProgress sx={{ my: 1 }} />
      <Typography>Getting stop times...</Typography>
    </>
  ) : (
    <Typography>
      No times were found for:
      <br />
      Stop: {props.stop}
      <br />
      Route: {props.route}
    </Typography>
  );
}
