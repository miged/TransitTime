import { Box, Card, Typography, Button } from '@mui/material';
import { FavouriteButton } from './FavouriteButton';
import { useDispatch } from 'react-redux';
import { setTimes } from '../app/stopResultsSlice.ts';

export interface Props {
  sx?: Object;
  stop_id: string;
  stop_name: string;
  route_id: string;
  route_num: string;
  route_name: string;
}

export const StopCard = (props: Props) => {
  const dispatch = useDispatch();

  function showTimesClick() {
    console.log('clicked', props);
    dispatch(
      setTimes({
        stop_id: props.stop_id,
        route_id: props.route_id,
        route_num: props.route_num,
        route_name: props.route_name,
      })
    );
  }

  return (
    <Card sx={{ width: 500, p: 2, ...props.sx }} variant="outlined">
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
        />
      </Box>
      <Button variant="contained" onClick={showTimesClick}>
        Show Times
      </Button>
    </Card>
  );
};
