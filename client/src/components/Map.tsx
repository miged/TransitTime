/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import useInterval from 'react-useinterval';

import { fetchBus, fetchRoute, fetchStop } from '../app/fetchData';

export interface Props {
  stop_code: string;
  vehicle_id: string;
  agency: string;
  route_id: string;
  route_num: string;
}

export const Map = (props: Props) => {
  const [map, setMap] = useState<any>(null);
  const [stopCoordinate, setStopCoordinate] = useState({
    lat: 53.53414,
    lon: -113.50254,
  });
  const [busCoordinate, setBusCoordinate] = useState({
    lat: 53.5341,
    lon: -113.50227,
  });
  const [timeUpdate, setTimeUpdate] = useState(null);
  const [routeMarkers, setRouteMarkers] = useState([]);

  let routeId = '';
  let agency = '';
  if (props.agency === 'o-c3x-edmontontransitservice') {
    agency = 'ets';
    routeId = props.route_id;
  } else if (props.agency === 'o-dpz8-ttc') {
    agency = 'ttc';
    routeId = props.route_num;
  }

  // Mapbox config
  const mapKey = process.env.REACT_APP_MAPBOX_KEY;
  const style = 'ckyqkh1f811fy14k876mhrntc';

  // Define icons
  const point = L.point(0, -18);
  const busIcon = L.icon({
    iconUrl: './assets/bus-white.png',
    iconSize: [26, 26],
    iconAnchor: [15, 15],
  });
  const stopIcon = L.icon({
    iconUrl: './assets/stop_icon.png',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  useEffect(() => {
    fetchStop(props.stop_code, agency, setStopCoordinate);
    fetchRoute(routeId, agency, setRouteMarkers);
  }, []);

  useInterval(() => {
    fetchBus(props.vehicle_id, agency, setBusCoordinate, setTimeUpdate);
  }, 10000);

  return (
    <>
      <MapContainer
        id="map"
        whenCreated={(map: any) => {
          setMap(map);
          fetchBus(
            props.vehicle_id,
            agency,
            setBusCoordinate,
            setTimeUpdate
          ).then((data) => {
            map.panTo([data.latitude, data.longitude]);
          });
        }}
        center={[busCoordinate.lat, busCoordinate.lon]}
        zoom={14}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.mapbox.com/">Mapbox</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url={`https://api.mapbox.com/styles/v1/shoumik2022/${style}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapKey}`}
        />
        <Marker
          icon={busIcon}
          position={[busCoordinate.lat, busCoordinate.lon]}
          eventHandlers={{
            click: (e) => {
              if (map) {
                map.panTo([busCoordinate.lat, busCoordinate.lon]);
              }
            },
          }}
        >
          <Tooltip
            permanent={true}
            direction={'top'}
            opacity={0.8}
            offset={point}
          >
            Updated: {timeUpdate}s ago.
          </Tooltip>
        </Marker>
        <Marker
          icon={stopIcon}
          position={[stopCoordinate.lat, stopCoordinate.lon]}
          eventHandlers={{
            click: (e) => {
              if (map) {
                map.panTo([stopCoordinate.lat, stopCoordinate.lon]);
              }
            },
          }}
        >
          <Popup>Your stop: #{props.stop_code}</Popup>
        </Marker>
        {routeMarkers}
      </MapContainer>
    </>
  );
};
