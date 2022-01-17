import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setSearchResults } from './stopResultsSlice';

export const StopSearchNearby = (props) => {
  const dispatch = useDispatch();

  function getLocation() {
    if (navigator.geolocation) {
      props.setLoading(true);
      dispatch(setSearchResults([]));
      navigator.geolocation.getCurrentPosition(nearbySearch);
    }
  }

  function nearbySearch(pos) {
    const { latitude, longitude } = pos.coords;
    const key = process.env.REACT_APP_TRANSITLAND_KEY;
    const url = `https://transit.land/api/v2/rest/stops?api_key=${key}&lat=${latitude}&lon=${longitude}&radius=750`;

    axios.get(url).then((res) => {
      dispatch(setSearchResults(res.data.stops));
      props.setLoading(false);
    });
  }

  return (
    <Button
      variant="contained"
      disableElevation
      onClick={() => {
        getLocation();
      }}
    >
      Search Nearby
    </Button>
  );
};
