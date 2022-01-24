import { Paper, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAppSelector } from '../app/hooks';

export const NearbyMap = () => {
  const pos = useAppSelector((state) => state.stopResults.location);
  const results = useAppSelector((state) => state.stopResults.searchResults);

  const stops = results.map((s) => {
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
      <Typography sx={{ p: 1.5 }}>Nearby Stops</Typography>
      <MapContainer
        className="nearby-map"
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
