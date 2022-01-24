import { Paper, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAppSelector } from '../app/hooks';

export const NearbyMap = () => {
  const pos = useAppSelector((state) => state.stopResults.location);
  const results = useAppSelector((state) => state.stopResults.searchResults);
  console.log('results', results);

  const stops = results.map((s) => {
    const routes = s.route_stops.map((r: any) => {
      return `${r.route.route_short_name} - ${r.route.route_long_name}`;
    });
    console.log(routes);

    return (
      <Marker
        key={s.id}
        position={[s.geometry.coordinates[1], s.geometry.coordinates[0]]}
      >
        <Popup>
          {s.stop_name} ({s.stop_id})
        </Popup>
      </Marker>
    );
  });

  return (
    <Paper>
      <Typography sx={{ p: 1 }}>Nearby Stops</Typography>
      <MapContainer
        id="map"
        center={[pos.latitude, pos.longitude]}
        zoom={15}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {stops}
      </MapContainer>
    </Paper>
  );
};
