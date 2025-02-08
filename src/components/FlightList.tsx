import { Plane } from 'lucide-react';
import { Aircraft } from '@prisma/client';

interface FlightListProps {
  flights: Aircraft[];
  selectedFlight: Aircraft | null;
  onSelectFlight: (flight: Aircraft) => void;
  theme: 'dark' | 'light';
}

export default function FlightList({ flights, selectedFlight, onSelectFlight, theme }: FlightListProps) {
  return (
    <div className="h-[60vh] overflow-y-auto pr-2 font-mono">
      <h2 className={`text-xl font-bold mb-4 sticky top-0 ${
        theme === 'dark' 
          ? 'bg-black pb-2 border-b border-green-500/20' 
          : 'bg-white pb-2 border-b border-gray-200'
      }`}>
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
              <div className="font-bold">{flight.flight?.trim() || 'Unknown'}</div>
              <div className="text-sm text-green-600">
                {flight.altBaro}ft • {flight.speed}kts
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}