import { Paper, Typography } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useAppSelector } from '../app/hooks';

export const NearbyMap = () => {
  const pos = useAppSelector((state) => state.stopResults.location);
  const results = useAppSelector((state) => state.stopResults.searchResults);
  const mapKey = process.env.REACT_APP_MAPBOX_KEY;
  const style = 'ckyqkh1f811fy14k876mhrntc';

  const stops = results.map((s) => {
    return (
      <Marker
        key={s.id}
        position={[s.geometry.coordinates[1], s.geometry.coordinates[0]]}
      >
        <Popup>
          {s.stop_name} ({s.stop_code})
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
          url={`https://api.mapbox.com/styles/v1/shoumik2022/${style}/tiles/256/{z}/{x}/{y}@2x?access_token=${mapKey}`}
        />
        {stops}
      </MapContainer>
    </Paper>
  );
};
