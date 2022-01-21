import axios from "axios";
import { useEffect, useState } from "react";
import "./BusDropdown.css";
import { Map } from "./Map";

export default function BusDropdown(props) {
  const [clicked, setClicked] = useState(false);
  const [trip, setTrip] = useState();
  const [showMap, setShowMap] = useState(false);

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

  const toggleable = () => {
    showMap ? setShowMap(false) : setShowMap(true);
  };

  return (
    <tbody>
      <tr onClick={() => toggleable()}>
        <td>{props.route_id}</td>
        <td>{props.route_name}</td>
        <td>{trip}</td>
        <td>{props.time} min</td>
      </tr>
      <tr>
        <td id="map-row">
          {showMap && (
            <Map vehicle_id={props.vehicle_id} stop_id={props.stop_id} />
          )}
        </td>
      </tr>
    </tbody>
  );
}
