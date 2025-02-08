import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import FlightMap from './components/FlightMap';
import FlightInfo from './components/FlightInfo';
import FlightList from './components/FlightList';
import { FlightData } from './types';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

function getRandomOffset() {
  return (Math.random() - 0.5) * 0.01; // Small random offset
}

function updateFlightPositions(flights: FlightData[]): FlightData[] {
  return flights.map(flight => {
    if (flight.lat && flight.lon) {
      return {
        ...flight,
        lat: flight.lat + getRandomOffset(),
        lon: flight.lon + getRandomOffset(),
      };
    }
    return flight;
  });
}

function App() {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<FlightData | null>(null);

  useEffect(() => {
    async function fetchFlights() {
      const { data, error } = await supabase
        .from('aircraft')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) {
        console.error('Error fetching flights:', error);
        return;
      }

      // Group by hex and take the latest entry for each aircraft
      const latestFlights = Object.values(
        data.reduce((acc: Record<string, FlightData>, flight) => {
          if (!acc[flight.hex] || acc[flight.hex].timestamp < flight.timestamp) {
            acc[flight.hex] = flight;
          }
          return acc;
        }, {})
      );

      const validFlights = latestFlights.filter(
        flight => flight.lat && flight.lon && flight.flight?.trim()
      ) as FlightData[];

      setFlights(validFlights);
      if (validFlights.length > 0 && !selectedFlight) {
        setSelectedFlight(validFlights[0]);
      }
    }

    fetchFlights();

    // Subscribe to changes
    const subscription = supabase
      .channel('aircraft_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'aircraft',
        },
        (payload) => {
          setFlights(currentFlights => {
            const newFlight = payload.new as FlightData;
            if (!newFlight.lat || !newFlight.lon || !newFlight.flight?.trim()) {
              return currentFlights;
            }

            // Remove any old entries for this aircraft and add the new one
            const updatedFlights = currentFlights
              .filter(f => f.hex !== newFlight.hex)
              .concat(newFlight);

            // Sort by timestamp descending
            return updatedFlights.sort((a, b) => b.timestamp - a.timestamp);
          });
        }
      )
      .subscribe();

    // Set up periodic refresh
    const refreshInterval = setInterval(fetchFlights, 30000); // Refresh every 30 seconds

    return () => {
      subscription.unsubscribe();
      clearInterval(refreshInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-500 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="border-b border-green-500/20 pb-4">
          <h1 className="text-3xl font-mono font-bold text-green-500">FlightAware Terminal</h1>
          <p className="text-green-600 font-mono mt-2">Tracking {flights.length} aircraft</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-3 border border-green-500/20 rounded-lg p-4">
            <FlightList
              flights={flights}
              selectedFlight={selectedFlight}
              onSelectFlight={setSelectedFlight}
            />
          </div>
          
          <div className="lg:col-span-6">
            <div className="border border-green-500/20 rounded-lg p-4">
              <FlightMap 
                flights={flights} 
                selectedFlight={selectedFlight}
                onSelectFlight={setSelectedFlight}
              />
            </div>
          </div>

          <div className="lg:col-span-3 border border-green-500/20 rounded-lg p-4">
            {selectedFlight ? (
              <FlightInfo flight={selectedFlight} />
            ) : (
              <p className="text-green-500 font-mono">Select a flight to view details</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;