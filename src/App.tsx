import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import FlightMap from './components/FlightMap';
import FlightInfo from './components/FlightInfo';
import FlightList from './components/FlightList';
import { Aircraft } from '@prisma/client';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

// Add theme type
type Theme = 'dark' | 'light';

function App() {
  const [flights, setFlights] = useState<Aircraft[]>([]);
  const [selectedFlight, setSelectedFlight] = useState<Aircraft | null>(null);
  const [theme, setTheme] = useState<Theme>('dark');

  // Add theme toggle handler
  const toggleTheme = () => {
    setTheme(current => current === 'dark' ? 'light' : 'dark');
  };

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

      const transformedData = data.map(transformFlightData);

      const latestFlights = Object.values(
        transformedData.reduce((acc: Record<string, Aircraft>, flight) => {
          if (!acc[flight.hex] || acc[flight.hex].timestamp < flight.timestamp) {
            acc[flight.hex] = flight;
          }
          return acc;
        }, {})
      );

      const validFlights = latestFlights.filter(
        flight => flight.lat && flight.lon && flight.flight?.trim()
      ) as unknown as Aircraft[];

      setFlights(validFlights);
      if (validFlights.length > 0 && !selectedFlight) {
        setSelectedFlight(validFlights[0]);
      }
    }

    // Move the transform function outside to reuse it
    function transformFlightData(rawFlight: any): Aircraft {
      return {
        hex: rawFlight.hex,
        flight: rawFlight.flight ?? null,
        altBaro: rawFlight.alt_baro ?? null,
        lat: rawFlight.lat ?? null,
        lon: rawFlight.lon ?? null,
        speed: rawFlight.speed ?? null,
        track: rawFlight.track ?? null,
        seen: rawFlight.seen ?? null,
        seenPos: rawFlight.seen_pos ?? null,
        timestamp: BigInt(rawFlight.timestamp)
      };
    }

    fetchFlights();

    // Subscribe to all changes
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
          const newFlight = transformFlightData(payload.new);

          if (!newFlight.lat || !newFlight.lon || !newFlight.flight?.trim()) {
            return;
          }

          // Update flights state
          setFlights(currentFlights => {
            const updatedFlights = currentFlights
              .filter(f => f.hex !== newFlight.hex)
              .concat(newFlight)
              .sort((a, b) => Number(b.timestamp - a.timestamp));
            return updatedFlights;
          });

          // Update selectedFlight if it matches the updated flight
          setSelectedFlight(current => {
            if (current?.hex === newFlight.hex) {
              return newFlight;
            }
            return current;
          });
        }
      )
      .subscribe();

    const refreshInterval = setInterval(fetchFlights, 30000);

    return () => {
      subscription.unsubscribe();
      clearInterval(refreshInterval);
    };
  }, []); // Empty dependency array since we don't need any dependencies

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-green-500' : 'bg-white text-gray-800'} p-4`}>
      <div className="max-w-7xl mx-auto space-y-6">
        <header className={`border-b ${theme === 'dark' ? 'border-green-500/20' : 'border-gray-200'} pb-4 flex justify-between items-center`}>
          <div>
            <h1 className={`text-3xl font-mono font-bold ${theme === 'dark' ? 'text-green-500' : 'text-gray-800'}`}>
              FlightAware Terminal
            </h1>
            <p className={`font-mono mt-2 ${theme === 'dark' ? 'text-green-600' : 'text-gray-600'}`}>
              Tracking {flights.length} aircraft
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg font-mono text-sm
              ${theme === 'dark' 
                ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
          >
            {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className={`lg:col-span-3 border rounded-lg p-4 
            ${theme === 'dark' ? 'border-green-500/20' : 'border-gray-200'}`}>
            <FlightList
              flights={flights}
              selectedFlight={selectedFlight}
              onSelectFlight={setSelectedFlight}
              theme={theme}
            />
          </div>
          
          <div className="lg:col-span-6">
            <div className={`border rounded-lg p-4 
              ${theme === 'dark' ? 'border-green-500/20' : 'border-gray-200'}`}>
              <FlightMap 
                flights={flights} 
                selectedFlight={selectedFlight}
                onSelectFlight={setSelectedFlight}
                theme={theme}
              />
            </div>
          </div>

          <div className={`lg:col-span-3 border rounded-lg p-4 
            ${theme === 'dark' ? 'border-green-500/20' : 'border-gray-200'}`}>
            {selectedFlight ? (
              <FlightInfo flight={selectedFlight} />
            ) : (
              <p className={`font-mono ${theme === 'dark' ? 'text-green-500' : 'text-gray-600'}`}>
                Select a flight to view details
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;