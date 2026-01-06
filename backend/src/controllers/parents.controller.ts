import { Request, Response } from 'express';
import { ParentsService } from '../services/parents.service';
import { ApiResponse } from '../types';

const parentsService = new ParentsService();

export async function createStudent(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.id;

    // Get parent profile
    const { data: parentProfile } = await require('../lib/supabase').supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!parentProfile) {
      res.status(404).json({
        success: false,
        error: 'Parent profile not found',
      });
      return;
    }

    const student = await parentsService.createStudent(parentProfile.id, req.body);

    const response: ApiResponse = {
      success: true,
      data: student,
    };

    res.status(201).json(response);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function getStudents(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.id;

    const { data: parentProfile } = await require('../lib/supabase').supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!parentProfile) {
      res.status(404).json({
        success: false,
        error: 'Parent profile not found',
      });
      return;
    }

    const students = await parentsService.getStudentsByParent(parentProfile.id);

    const response: ApiResponse = {
      success: true,
      data: students,
    };

    res.json(response);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

export async function getSubscription(req: Request, res: Response): Promise<void> {
  try {
    const userId = req.user!.id;

    const { data: parentProfile } = await require('../lib/supabase').supabaseAdmin
      .from('parent_profiles')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (!parentProfile) {
      res.status(404).json({
        success: false,
        error: 'Parent profile not found',
      });
      return;
    }

    const subscriptions = await parentsService.getSubscriptionByParent(parentProfile.id);

    const response: ApiResponse = {
      success: true,
      data: subscriptions,
    };

    res.json(response);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
}

