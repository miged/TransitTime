/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { Map } from "./Map";
import { Collapse, TableCell, TableRow, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

export default function BusDropdown(props) {
  const [clicked, setClicked] = useState(false);
  const [trip, setTrip] = useState();

  const key = process.env.REACT_APP_TRANSITLAND_KEY;

  useEffect(() => {
    if (props.agency === "o-c3x-edmontontransitservice") {
      axios
        .get(
          `https://transit.land/api/v2/rest/routes?operator_onestop_id=${props.agency}&route_id=${props.route_id}&api_key=${key}`
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
    }
  }, [props.trip_id]);

  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setClicked(!clicked)}
          >
            {clicked ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {props.agency === "o-c3x-edmontontransitservice" ? (
          <>
            <TableCell>{props.route_id}</TableCell>
            <TableCell>{props.route_name}</TableCell>
            <TableCell>{trip}</TableCell>
            <TableCell>{props.time} min</TableCell>
          </>
        ) : (
          <>
            <TableCell>{props.route_num}</TableCell>
            <TableCell>{props.route_name}</TableCell>
            <TableCell>{props.direction}</TableCell>
            <TableCell>{props.time} min</TableCell>
          </>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={clicked} timeout="auto" unmountOnExit>
            <Map
              vehicle_id={props.vehicle_id}
              stop_code={props.stop_code}
              route_id={props.route_id}
              route_num={props.route_num}
              agency={props.agency}
            />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
