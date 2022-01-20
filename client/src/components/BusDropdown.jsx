import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './BusDropdown.css';
import Map from './Map';

export default function BusDropdown(props) {

  const [clicked, setClicked] = useState(false);
  const [trip, setTrip] = useState()

  const key = process.env.REACT_APP_TRANSITLAND_KEY;

  useEffect (() => {
    axios.get(`https://transit.land/api/v2/rest/routes?operator_onestop_id=o-c3x-edmontontransitservice&route_id=${props.route_id}&api_key=${key}`)
    .then(response => {
      const onestop_id = response.data.routes[0].onestop_id
      axios.get(`https://transit.land/api/v2/rest/routes/${onestop_id}/trips?trip_id=${props.trip_id}&api_key=${key}`)
      .then(response => {
        setTrip(response.data.trips[0].trip_headsign)
      })
    });  
  }, [props.trip_id]);

  const clickClass = clicked
    ? 'expanded-row-content'
    : 'expanded-row-content hide-row';

  const toggleable = () => {
    if (!clicked) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  };

  return (
    <tbody>
      <tr onClick={() => toggleable()}>
        <td>{props.route_id}</td>
        <td>{props.route_name}</td>
        <td>{trip}</td>
        <td>{props.time} min</td>
        <td className={clickClass}>{/* <Map /> */}</td>
      </tr>
    </tbody>
  );
}
