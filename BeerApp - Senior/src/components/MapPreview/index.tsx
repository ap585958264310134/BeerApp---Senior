import '../../../node_modules/leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import { useOnline } from 'hooks/useOnline';

interface MapPreviewProps {
  className?: string;
  lat: number;
  lng: number;
}

function MyMapComponent(props: MapPreviewProps) {
  const isOnline = useOnline();

  if (!isOnline) {
    return null;
  }

  return (
    <div className={`${props.className}`}>
      <MapContainer
        center={props}
        zoom={5}
        style={{height: '100%'}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <CircleMarker center={props} />
      </MapContainer>
    </div>
  );
}

export default MyMapComponent;
