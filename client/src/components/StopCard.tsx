import { Box, Card, Typography, Button } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { FavouriteButton } from './FavouriteButton';
import { setTimes, clearLocation } from '../app/stopResultsSlice';

export interface Props {
  sx?: Object;
  stop_id: string;
  stop_name: string;
  route_id: string;
  route_num: string;
  route_name: string;
  agency: string;
}

export const StopCard = (props: Props) => {
  const dispatch = useAppDispatch();

  function showTimesClick() {
    dispatch(clearLocation());
    dispatch(
      setTimes({
        stop_id: props.stop_id,
        stop_name: props.stop_name,
        route_id: props.route_id,
        route_num: props.route_num,
        route_name: props.route_name,
        agency: props.agency,
      })
    );
  }

  return (
    <Card sx={{ width: 510, p: 2, ...props.sx }} elevation={4}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{ mr: 2, width: 50 }}>
          <Typography sx={{ fontSize: 24 }}>{props.route_num}</Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignContent: 'center',
            flexGrow: 1,
          }}
        >
          <Typography>
            {props.stop_name} ({props.stop_id})
          </Typography>
          <Typography>{props.route_name}</Typography>
        </Box>
        <FavouriteButton
          stop_id={props.stop_id}
          stop_name={props.stop_name}
          route_id={props.route_id}
          route_num={props.route_num}
          route_name={props.route_name}
          agency={props.agency}
        />
      </Box>
      <Button disableElevation variant="contained" onClick={showTimesClick}>
        Show Times
      </Button>
    </Card>
  );
};
