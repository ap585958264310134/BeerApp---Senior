import '../../../node_modules/leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, CircleMarker } from 'react-leaflet';
import { useOnline } from 'hooks/useOnline';

interface MapPreviewProps {
  className?: string;
  lat: number | null;
  lng: number | null;
}

function MyMapComponent(props: MapPreviewProps) {
  const isOnline = useOnline();

  if (!isOnline) {
    return null;
  }

  if (props.lat === null || props.lng === null) {
    return null;
  }

  const mapContainerCenter = {
    lat: props.lat,
    lng: props.lng
  };

  return (
    <div className={`${props.className}`}>
      <MapContainer
        center={mapContainerCenter}
        zoom={5}
        style={{height: '100%'}}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <CircleMarker center={mapContainerCenter} />
      </MapContainer>
    </div>
  );
}

export default MyMapComponent;
