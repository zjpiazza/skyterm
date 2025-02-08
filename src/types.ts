export interface FlightData {
  timestamp: number;
  hex: string;
  flight: string | null;
  altBaro: number | null;
  lat: number | null;
  lon: number | null;
  speed: number | null;
  track: number | null;
  seen: number | null;
  seenPos: number | null;
}