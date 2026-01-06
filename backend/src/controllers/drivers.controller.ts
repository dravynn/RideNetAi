import { Request, Response } from 'express';
import { DriversService } from '../services/drivers.service';
import { ApiResponse } from '../types';

const driversService = new DriversService();

export async function getPendingDrivers(req: Request, res: Response): Promise<void> {
  try {
    const drivers = await driversService.getPendingDrivers();

    const response: ApiResponse = {
      success: true,
      data: drivers,
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

export async function approveDriver(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const approvedBy = req.user!.id;

    const driver = await driversService.approveDriver(id, approvedBy);

    const response: ApiResponse = {
      success: true,
      data: driver,
      message: 'Driver approved successfully',
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

export async function getAllDrivers(req: Request, res: Response): Promise<void> {
  try {
    const drivers = await driversService.getAllDrivers();

    const response: ApiResponse = {
      success: true,
      data: drivers,
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

