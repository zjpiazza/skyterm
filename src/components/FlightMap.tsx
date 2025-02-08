import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-rotatedmarker';
import type { Aircraft } from '@prisma/client';
import 'leaflet/dist/leaflet.css';

// Create plane icons with and without selection effects
function createPlaneIcon(isSelected: boolean) {
  return new L.DivIcon({
    html: `
      <div class="airplane-wrapper ${isSelected ? 'selected' : ''}">
        ${isSelected ? '<div class="pulse-ring"></div>' : ''}
        <img 
          src="/plane.svg" 
          class="plane-icon ${isSelected ? 'selected' : ''}"
          width="24" 
          height="24"
        />
      </div>
    `,
    className: 'airplane-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
}

// Add this function to adjust the rotation
function getAdjustedRotation(track: number | null): number {
  if (track === null) return 0;
  
  // Normalize 360 to 0
  const normalizedTrack = track === 360 ? 0 : track;
  
  // Convert heading to rotation by subtracting from default 135° orientation
  return normalizedTrack - 45;
}

interface FlightMapProps {
  flights: Aircraft[];
  selectedFlight: Aircraft | null;
  onSelectFlight: (flight: Aircraft) => void;
  theme: 'dark' | 'light';
}

export default function FlightMap({ flights, selectedFlight, onSelectFlight, theme }: FlightMapProps) {
  const center = flights.length > 0 && flights[0].lat && flights[0].lon
    ? [flights[0].lat, flights[0].lon]
    : [29.9902, -95.3368]; // Default to Houston area

  // Select tile layer based on theme
  const tileLayerUrl = theme === 'dark'
    ? "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
    : "https://tile.openstreetmap.org/{z}/{x}/{y}.png";

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={9}
      className={`h-[60vh] w-full rounded-lg theme-${theme}`}
      style={{ background: theme === 'dark' ? '#000' : '#fff' }}
      zoomControl={false}
    >
      <TileLayer
        url={tileLayerUrl}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        className={`map-tiles theme-${theme}`}
      />
      {flights.map((flight) => {
        if (!flight.lat || !flight.lon) return null;
        
        const isSelected = selectedFlight?.hex === flight.hex;
        
        return (
          <Marker
            key={flight.hex}
            position={[flight.lat, flight.lon]}
            icon={createPlaneIcon(isSelected)}
            eventHandlers={{
              click: () => onSelectFlight(flight),
            }}
            rotationAngle={getAdjustedRotation(flight.track)}
            rotationOrigin="center"
          />
        );
      })}
    </MapContainer>
  );
}