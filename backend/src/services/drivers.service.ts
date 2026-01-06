import { supabaseAdmin } from '../lib/supabase';
import { DriverProfile, DriverStatus } from '../types';

export class DriversService {
  /**
   * Get all pending drivers
   */
  async getPendingDrivers(): Promise<DriverProfile[]> {
    const { data, error } = await supabaseAdmin
      .from('driver_profiles')
      .select('*')
      .eq('status', 'PENDING')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch pending drivers: ${error.message}`);
    }

    return (data || []) as DriverProfile[];
  }

  /**
   * Approve a driver
   */
  async approveDriver(
    driverId: string,
    approvedBy: string
  ): Promise<DriverProfile> {
    const { data, error } = await supabaseAdmin
      .from('driver_profiles')
      .update({
        status: 'APPROVED' as DriverStatus,
        approved_at: new Date().toISOString(),
        approved_by: approvedBy,
      })
      .eq('id', driverId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to approve driver: ${error.message}`);
    }

    return data as DriverProfile;
  }

  /**
   * Get all drivers
   */
  async getAllDrivers(): Promise<DriverProfile[]> {
    const { data, error } = await supabaseAdmin
      .from('driver_profiles')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch drivers: ${error.message}`);
    }

    return (data || []) as DriverProfile[];
  }
}

