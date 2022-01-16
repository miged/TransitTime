import { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => {
  let [coordinate, setCoordinate] = useState({
    lat: 53.53051,
    lon: -113.50109,
  });

  var myIcon = L.icon({
    iconUrl: "./assets/bus-stop.png",
    iconSize: [24.125, 32],
    iconAnchor: [12.0625, 32],
  });

  return (
    <MapContainer
      id="map"
      center={[coordinate.lat, coordinate.lon]}
      zoom={12}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={myIcon} position={[coordinate.lat, coordinate.lon]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>

      <Marker position={[53.53062, -113.50018]}>
        <Popup>Bus Stop #111</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
