import { supabaseAdmin } from '../lib/supabase';
import { Student, Subscription } from '../types';

export class ParentsService {
  /**
   * Create a new student for a parent
   */
  async createStudent(
    parentId: string,
    studentData: Omit<Student, 'id' | 'parent_id' | 'created_at' | 'updated_at'>
  ): Promise<Student> {
    const { data, error } = await supabaseAdmin
      .from('students')
      .insert({
        parent_id: parentId,
        ...studentData,
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create student: ${error.message}`);
    }

    return data as Student;
  }

  /**
   * Get all students for a parent
   */
  async getStudentsByParent(parentId: string): Promise<Student[]> {
    const { data, error } = await supabaseAdmin
      .from('students')
      .select('*')
      .eq('parent_id', parentId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch students: ${error.message}`);
    }

    return (data || []) as Student[];
  }

  /**
   * Get subscription for a parent
   */
  async getSubscriptionByParent(parentId: string): Promise<Subscription[]> {
    const { data, error } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('parent_id', parentId)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Failed to fetch subscriptions: ${error.message}`);
    }

    return (data || []) as Subscription[];
  }
}

