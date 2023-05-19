import '../../../node_modules/leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';

interface MapPreviewProps {
  className?: string;
  lat: number;
  lng: number;
}

function MyMapComponent(props: MapPreviewProps) {
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
