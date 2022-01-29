import axios from 'axios';
import { Circle } from 'react-leaflet';

const url = process.env.REACT_APP_API_URL;

export const fetchBus = (busId, agency, setBusCoordinate, setTimeUpdate) => {
  return axios
    .get(`${url}/busLocation/${agency}/${busId}`)
    .then((res) => {
      let data = res.data.position;
      if (data) {
        setBusCoordinate((prev) => ({
          ...prev,
          lat: data.latitude,
          lon: data.longitude,
        }));
      }
      // Get time last bus pos updated
      if (agency === 'ets') {
        let timeDiff = Math.floor(Date.now() / 1000) - res.data.time.low;
        setTimeUpdate((prev) => timeDiff);
      } else if (agency === 'ttc') {
        setTimeUpdate((prev) => res.data.secsSinceReport);
      }
      return data;
    })
    .catch((err) => console.log(err));
};

export const fetchRoute = (routeId, agency, setRouteMarkers) => {
  axios
    .get(`${url}/busRoute/${agency}/${routeId}`)
    .then((res) => {
      let stopMarkers = res.data.map((obj) => {
        return (
          <Circle
            key={obj.stop_id}
            center={[obj.lat, obj.lon]}
            pathOptions={{ color: 'yellow' }}
            radius={4}
          />
        );
      });
      return stopMarkers;
    })
    .then((data) => {
      setRouteMarkers(data);
    });
};

export const fetchStop = (stopId, agency, setStopCoordinate) => {
  axios
    .get(`${url}/stopLocation/${agency}/${stopId}`)
    .then((res) => {
      if (Object.keys(res.data).length === 0) {
        console.log('NO STOPS FOUND!');
      }
      if (Object.keys(res.data).length !== 0) {
        setStopCoordinate((prev) => ({
          ...prev,
          lat: Number(res.data.stop_lat),
          lon: Number(res.data.stop_lon),
        }));
        console.log('Set stop COORD to:', res.data.stop_lat, res.data.stop_lon);
      }
    })
    .catch((err) => console.log(err));
};
