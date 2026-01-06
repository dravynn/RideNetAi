import { supabaseAdmin } from '../lib/supabase';
import { Group, GroupStudent } from '../types';

export class GroupsService {
  /**
   * Create a new group
   */
  async createGroup(
    groupData: Omit<Group, 'id' | 'created_at' | 'updated_at'>
  ): Promise<Group> {
    const { data, error } = await supabaseAdmin
      .from('groups')
      .insert(groupData)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create group: ${error.message}`);
    }

    return data as Group;
  }

  /**
   * Assign a driver to a group
   */
  async assignDriverToGroup(
    groupId: string,
    driverId: string
  ): Promise<Group> {
    const { data, error } = await supabaseAdmin
      .from('groups')
      .update({ driver_id: driverId })
      .eq('id', groupId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to assign driver: ${error.message}`);
    }

    return data as Group;
  }

  /**
   * Add students to a group
   */
  async addStudentsToGroup(
    groupId: string,
    studentIds: string[],
    pickupOrder?: number[],
    dropoffOrder?: number[]
  ): Promise<GroupStudent[]> {
    const groupStudents = studentIds.map((studentId, index) => ({
      group_id: groupId,
      student_id: studentId,
      pickup_order: pickupOrder?.[index] || null,
      dropoff_order: dropoffOrder?.[index] || null,
    }));

    const { data, error } = await supabaseAdmin
      .from('group_students')
      .insert(groupStudents)
      .select();

    if (error) {
      throw new Error(`Failed to add students to group: ${error.message}`);
    }

    return (data || []) as GroupStudent[];
  }

  /**
   * Get all groups
   */
  async getAllGroups(): Promise<Group[]> {
    const { data, error } = await supabaseAdmin
      .from('groups')
      .select('*')
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch groups: ${error.message}`);
    }

    return (data || []) as Group[];
  }
}

