'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { getSocket } from '@/lib/socket/client';
import { LocationPoint } from '@/types';

export default function TrackingPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;
  const [locations, setLocations] = useState<LocationPoint[]>([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    async function setupTracking() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push('/login');
        return;
      }

      try {
        const socket = await getSocket();

        socket.on('connect', () => {
          setConnected(true);
          socket.emit('join-trip', tripId);
        });

        socket.on('joined-trip', () => {
          console.log('Joined trip:', tripId);
        });

        socket.on('location-history', (history: LocationPoint[]) => {
          setLocations(history);
        });

        socket.on('location-update', (location: LocationPoint) => {
          setLocations((prev) => [...prev, location]);
        });

        socket.on('error', (error: { message: string }) => {
          console.error('Socket error:', error);
        });
      } catch (error) {
        console.error('Failed to setup tracking:', error);
      }
    }

    setupTracking();
  }, [tripId, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Live Tracking - Trip {tripId}
          </h2>

          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  connected ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm text-gray-600">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Location History</h3>
            {locations.length === 0 ? (
              <p className="text-gray-600">No location data yet</p>
            ) : (
              <div className="space-y-2">
                {locations.map((location) => (
                  <div
                    key={location.id}
                    className="border-b pb-2 text-sm text-gray-600"
                  >
                    <div>
                      Lat: {location.latitude}, Lng: {location.longitude}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(location.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Map integration would go here */}
          <div className="bg-white p-6 rounded-lg shadow mt-4">
            <p className="text-gray-600">Map view (Google Maps/Mapbox integration)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

