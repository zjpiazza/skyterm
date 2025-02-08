import { FlightData } from '../types';
import { Plane } from 'lucide-react';

interface FlightInfoProps {
  flight: FlightData;
}

export default function FlightInfo({ flight }: FlightInfoProps) {
  return (
    <div className="font-mono space-y-4">
      <div className="flex items-center gap-2">
        <Plane className="text-green-500" />
        <h2 className="text-xl font-bold text-green-500">{flight.flight.trim()}</h2>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-green-600">Altitude (Baro)</p>
          <p className="text-green-500">{flight.alt_baro} ft</p>
        </div>
        <div>
          <p className="text-green-600">Ground Speed</p>
          <p className="text-green-500">{flight.gs} kts</p>
        </div>
        <div>
          <p className="text-green-600">Track</p>
          <p className="text-green-500">{flight.track}°</p>
        </div>
        <div>
          <p className="text-green-600">Vertical Rate</p>
          <p className="text-green-500">{flight.baro_rate} ft/min</p>
        </div>
        <div>
          <p className="text-green-600">Squawk</p>
          <p className="text-green-500">{flight.squawk}</p>
        </div>
        <div>
          <p className="text-green-600">Emergency</p>
          <p className="text-green-500">{flight.emergency}</p>
        </div>
      </div>

      <div className="mt-4">
        <p className="text-green-600">Position</p>
        <p className="text-green-500">
          {flight.lat.toFixed(4)}°N, {flight.lon.toFixed(4)}°W
        </p>
      </div>
    </div>
  );
}