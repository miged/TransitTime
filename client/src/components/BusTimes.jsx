import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import BusDropdown from './BusDropdown';
import './BusDropdown.css';

export default function BusTimes(props) {
  const [GTFS, setGTFS] = useState([]);

  let uniqueIdCount = 0;
  function uniqueId() {
    uniqueIdCount += 1;
    return uniqueIdCount;
  }

  const refreshData = () => {
    axios
      .get('http://localhost:3001/api/trips', {
        params: {
          stop_id: props.stop_id,
          route_id: props.route_id,
        },
      })
      .then((response) => {
        let parsedFeeds = JSON.parse(response.data);
        setGTFS(parsedFeeds);
      });
  };

  useEffect(() => {
    refreshData();
    setInterval(refreshData, 30000);
  }, []);

  const busTimes = GTFS.map((data) => {
    return (
      <BusDropdown
        key={uniqueId()}
        stop_id={data.stopId}
        trip_id={data.tripId}
        route_id={data.routeId}
        route_name={props.route_name}
        time={data.time}
        vehicle_id={data.vehicleID}
      />
    );
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Route</th>
          <th>Name</th>
          <th>Time</th>
        </tr>
      </thead>
      <>{busTimes}</>
    </table>
  );
}
