/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import BusDropdown from './BusDropdown';
import NoBusTimes from './NoBusTimes';
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from '@mui/material';
import { useSelector } from 'react-redux';
import useInterval from 'react-useinterval';

export default function BusTimes(props) {
  const [GTFS, setGTFS] = useState([]);
  const [loading, setLoading] = useState(false);
  const times = useSelector((state) => state.stopResults.times);

  let uniqueIdCount = 0;
  function uniqueId() {
    uniqueIdCount += 1;
    return uniqueIdCount;
  }

  const refreshData = () => {
    axios
      .get('http://localhost:8080/api/trips', {
        params: {
          stop_id: times.stop_id,
          route_id: times.route_id,
          route_num: times.route_num,
          agency: times.agency,
        },
      })
      .then((response) => {
        let parsedFeeds = JSON.parse(response.data);
        setGTFS(parsedFeeds);
        setLoading(false);
      });
  };

  useEffect(() => {
    setGTFS([]);
    setLoading(true);
    refreshData(true);
  }, [times]);

  useInterval(refreshData, 30000);

  let busTimes = GTFS.map((data) => {
    return (
      <BusDropdown
        key={uniqueId()}
        stop_code={data.stopId}
        trip_id={data.tripId}
        route_id={data.routeId}
        route_name={times.route_name}
        route_num={times.route_num}
        time={data.time}
        vehicle_id={data.vehicleID}
        agency={times.agency}
        direction={data.direction}
      />
    );
  });

  return (
    <>
      {busTimes.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>Route</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Destination</TableCell>
                <TableCell sx={{ width: 100 }}>Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <>{busTimes}</>
            </TableBody>
          </Table>
        </TableContainer>
      ) : times.stop_code !== undefined ? (
        <Paper sx={{ py: 1 }} elevation={1}>
          <NoBusTimes
            loading={loading}
            stop={times.stop_name}
            route={times.route_name}
          />
        </Paper>
      ) : (
        <Paper sx={{ py: 10, fontSize: 24 }} elevation={1}>
          Search for a stop to get started.
        </Paper>
      )}
    </>
  );
}
