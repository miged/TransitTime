import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { StopCard } from './StopCard';

export default function Pb(props) {

  const [GTFS, setGTFS] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/trips')
      .then(response => {
        let parsedFeeds = JSON.parse(response.data);
        setGTFS(parsedFeeds)
      });  
  }, []);

  const busTimes = GTFS.map ((data) => {
    return (
      <StopCard
        stop_id={data.stopId}
        trip_id={data.tripId}
        route_id={data.routeId}
        time={data.time}
        vehicle_id={data.vehicleID}
      />
      )
    }
  )

  return (
    <>{busTimes}</>
  );
}