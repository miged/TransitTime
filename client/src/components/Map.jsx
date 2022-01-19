import { useState, useEffect } from "react";
import L, { Point } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import axios from "axios";

const Map = (props) => {
  let [stopCoordinate, setStopCoordinate] = useState({
    lat: 53.53414,
    lon: -113.50254,
  });
  let [busCoordinate, setBusCoordinate] = useState({
    lat: 53.5341,
    lon: -113.50227,
  });

  let [count, setCount] = useState(0);

  let id = 2177; //props.id //bus id

  const point = L.point(0, -18);

  const busIcon = L.icon({
    iconUrl: "./assets/bus_pos.png",
    iconSize: [24.4, 28],
    iconAnchor: [12.2, 28],
  });

  const stopIcon = L.icon({
    iconUrl: "./assets/stop_icon.png",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });

  useEffect(() => {
    axios
      .get(`api/busLocation/${id}`)
      .then((res) => {
        let data = res.data.position;
        setBusCoordinate((prev) => ({
          ...prev,
          lat: data.latitude,
          lon: data.longitude,
        }));
      })
      .catch((err) => console.log(err));
  }, [count]);

  return (
    <>
      <MapContainer
        id="map"
        center={[stopCoordinate.lat, stopCoordinate.lon]}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={busIcon}
          position={[busCoordinate.lat, busCoordinate.lon]}
        >
          <Tooltip
            permanent={true}
            direction={"top"}
            opacity={0.8}
            offset={point}
          >
            30s ago.
          </Tooltip>
        </Marker>

        <Marker
          icon={stopIcon}
          position={[stopCoordinate.lat, stopCoordinate.lon]}
        >
          <Popup>Bus Stop #111</Popup>
        </Marker>
      </MapContainer>
      <button
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Counter
      </button>
      <div>{count}</div>
    </>
  );
};

export default Map;
