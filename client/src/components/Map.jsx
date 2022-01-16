import { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

let data = [
  { lat: 53.53055, lon: -113.50073 },
  { lat: 53.53062, lon: -113.50015 },
  { lat: 53.53075, lon: -113.49958 },
  { lat: 53.53093, lon: -113.49914 },
  { lat: 53.53111, lon: -113.49881 },
  { lat: 53.53128, lon: -113.49848 },
];

const Map = () => {
  let [coordinate, setCoordinate] = useState({
    lat: 53.53051,
    lon: -113.50109,
  });

  useEffect(() => {
    let i = 0;
    setInterval(() => {
      setCoordinate(data[i]);
      if (i === 5) {
        i = -1;
      }
      i++;
    }, 3000);
  }, []);

  const busIcon = L.icon({
    iconUrl: "./assets/bus-stop.png",
    iconSize: [24.125, 32],
    iconAnchor: [12.0625, 32],
  });

  return (
    <MapContainer
      id="map"
      center={[coordinate.lat, coordinate.lon]}
      zoom={18}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={busIcon} position={[coordinate.lat, coordinate.lon]}>
        <Popup>Last updated 30s ago.</Popup>
      </Marker>

      <Marker position={[53.53062, -113.50018]}>
        <Popup>Bus Stop #111</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
