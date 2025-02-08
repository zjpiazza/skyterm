import React from 'react';
import { Plane } from 'lucide-react';
import type { FlightData } from '../types';

interface FlightListProps {
  flights: FlightData[];
  selectedFlight: FlightData | null;
  onSelectFlight: (flight: FlightData) => void;
}

export default function FlightList({ flights, selectedFlight, onSelectFlight }: FlightListProps) {
  return (
    <div className="h-[60vh] overflow-y-auto pr-2 font-mono">
      <h2 className="text-xl font-bold mb-4 sticky top-0 bg-black pb-2 border-b border-green-500/20">
        Active Flights
      </h2>
      <div className="space-y-2">
        {flights.map((flight) => (
          <button
            key={flight.hex}
            onClick={() => onSelectFlight(flight)}
            className={`w-full text-left p-3 rounded transition-all ${
              selectedFlight?.hex === flight.hex
                ? 'bg-green-500/20 border-green-500'
                : 'hover:bg-green-500/10 border-transparent'
            } border flex items-center gap-3`}
          >
            <Plane
              className={`${
                selectedFlight?.hex === flight.hex ? 'text-green-400' : 'text-green-600'
              }`}
              style={{ transform: `rotate(${flight.track}deg)` }}
            />
            <div>
              <div className="font-bold">{flight.flight.trim()}</div>
              <div className="text-sm text-green-600">
                {flight.alt_baro}ft • {flight.gs}kts
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}