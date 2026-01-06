import { Request, Response } from 'express';
import { GroupsService } from '../services/groups.service';
import { ApiResponse } from '../types';

const groupsService = new GroupsService();

export async function createGroup(req: Request, res: Response): Promise<void> {
  try {
    const createdBy = req.user!.id;
    const group = await groupsService.createGroup({
      ...req.body,
      created_by: createdBy,
    });

    const response: ApiResponse = {
      success: true,
      data: group,
      message: 'Group created successfully',
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

export async function assignDriverToGroup(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { driver_id } = req.body;

    if (!driver_id) {
      res.status(400).json({
        success: false,
        error: 'driver_id is required',
      });
      return;
    }

    const group = await groupsService.assignDriverToGroup(id, driver_id);

    const response: ApiResponse = {
      success: true,
      data: group,
      message: 'Driver assigned successfully',
    };

    res.json(response);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({
      success: false,
      error: err.message,
    });
  }
}

export async function getAllGroups(req: Request, res: Response): Promise<void> {
  try {
    const groups = await groupsService.getAllGroups();

    const response: ApiResponse = {
      success: true,
      data: groups,
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

