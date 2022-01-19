import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { StopCard } from './StopCard.tsx';

export default function BusTimes(props) {
  const [GTFS, setGTFS] = useState([]);

  const refreshData = () => {
    axios
      .get('http://localhost:8080/api/trips', {
        params: {
          stop_id: '5359',
          route_id: '002',
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
      <StopCard
        stop_id={data.stopId}
        trip_id={data.tripId}
        route_id={data.routeId}
        time={data.time}
        vehicle_id={data.vehicleID}
      />
    );
  });

  return <>{busTimes}</>;
}
