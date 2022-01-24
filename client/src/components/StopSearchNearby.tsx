import axios from 'axios';
import { Button } from '@mui/material';
import { useAppDispatch } from '../app/hooks';
import { setSearchResults, setLocation } from '../app/stopResultsSlice';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export interface Props {
  sx?: Object;
  setLoading: Function;
}

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Position {
  coords: Coordinates;
}

export const StopSearchNearby = (props: Props) => {
  const dispatch = useAppDispatch();

  function getLocation() {
    if (navigator.geolocation) {
      props.setLoading(true);
      dispatch(setSearchResults([]));
      navigator.geolocation.getCurrentPosition(nearbySearch);
    }
  }

  function nearbySearch(pos: Position) {
    const { latitude, longitude } = pos.coords;
    const key = process.env.REACT_APP_TRANSITLAND_KEY;
    const url = `https://transit.land/api/v2/rest/stops?api_key=${key}&lat=${latitude}&lon=${longitude}&radius=750`;

    dispatch(setLocation({ latitude, longitude }));
    axios.get(url).then((res) => {
      dispatch(setSearchResults(res.data.stops));
      props.setLoading(false);
    });
  }

  return (
    <Button
      variant="contained"
      disableElevation
      onClick={getLocation}
      startIcon={<MyLocationIcon />}
    >
      Search Nearby
    </Button>
  );
};
