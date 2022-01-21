import axios from 'axios';
import { useEffect, useState } from 'react';
//import './BusDropdown.css';
import { Map } from './Map';
import { Collapse, TableBody, TableCell, TableRow, Typography } from '@mui/material';

export default function BusDropdown(props) {
  const [clicked, setClicked] = useState(false);
  const [trip, setTrip] = useState();

  const key = process.env.REACT_APP_TRANSITLAND_KEY;

  useEffect(() => {
    axios
      .get(
        `https://transit.land/api/v2/rest/routes?operator_onestop_id=o-c3x-edmontontransitservice&route_id=${props.route_id}&api_key=${key}`
      )
      .then((response) => {
        const onestop_id = response.data.routes[0].onestop_id;
        axios
          .get(
            `https://transit.land/api/v2/rest/routes/${onestop_id}/trips?trip_id=${props.trip_id}&api_key=${key}`
          )
          .then((response) => {
            setTrip(response.data.trips[0].trip_headsign);
          });
      });
  }, [props.trip_id]);

  return (
    <TableBody>
      <TableRow>
        <TableCell>{props.route_id}</TableCell>
        <TableCell>{props.route_name}</TableCell>
        <TableCell>{trip}</TableCell>
        <TableCell>{props.time} min</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={4}>
          <Typography onClick={() => setClicked(!clicked)}> Expand Map </Typography>
          <Collapse in={clicked} timeout="auto" unmountOnExit>
            <Map vehicle_id={props.vehicle_id} stop_id={props.stop_id} />
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
