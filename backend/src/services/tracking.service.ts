import { supabaseAdmin } from '../lib/supabase';
import { LocationPoint, TripSession } from '../types';

export class TrackingService {
  /**
   * Record a location point for a trip
   */
  async recordLocation(
    tripSessionId: string,
    locationData: {
      latitude: number;
      longitude: number;
      accuracy?: number;
      speed?: number;
      heading?: number;
    }
  ): Promise<LocationPoint> {
    // Verify trip session exists and is active
    const { data: trip, error: tripError } = await supabaseAdmin
      .from('trip_sessions')
      .select('id, status')
      .eq('id', tripSessionId)
      .single();

    if (tripError || !trip) {
      throw new Error('Trip session not found');
    }

    if (trip.status !== 'IN_PROGRESS') {
      throw new Error('Trip session is not in progress');
    }

    const { data, error } = await supabaseAdmin
      .from('location_points')
      .insert({
        trip_session_id: tripSessionId,
        ...locationData,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to record location: ${error.message}`);
    }

    return data as LocationPoint;
  }

  /**
   * Get location history for a trip
   */
  async getTripLocations(tripSessionId: string): Promise<LocationPoint[]> {
    const { data, error } = await supabaseAdmin
      .from('location_points')
      .select('*')
      .eq('trip_session_id', tripSessionId)
      .order('timestamp', { ascending: true });

    if (error) {
      throw new Error(`Failed to fetch locations: ${error.message}`);
    }

    return (data || []) as LocationPoint[];
  }

  /**
   * Get active trip session
   */
  async getActiveTripSession(tripSessionId: string): Promise<TripSession | null> {
    const { data, error } = await supabaseAdmin
      .from('trip_sessions')
      .select('*')
      .eq('id', tripSessionId)
      .in('status', ['SCHEDULED', 'IN_PROGRESS'])
      .single();

    if (error) {
      return null;
    }

    return data as TripSession;
  }
}

