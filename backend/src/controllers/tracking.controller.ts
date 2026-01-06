import { Request, Response } from 'express';
import { TrackingService } from '../services/tracking.service';
import { ApiResponse } from '../types';

const trackingService = new TrackingService();

export async function recordLocation(req: Request, res: Response): Promise<void> {
  try {
    const { trip_session_id } = req.body;

    if (!trip_session_id) {
      res.status(400).json({
        success: false,
        error: 'trip_session_id is required',
      });
      return;
    }

    const location = await trackingService.recordLocation(trip_session_id, req.body);

    const response: ApiResponse = {
      success: true,
      data: location,
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

export async function getTripLocations(req: Request, res: Response): Promise<void> {
  try {
    const { tripId } = req.params;

    const locations = await trackingService.getTripLocations(tripId);

    const response: ApiResponse = {
      success: true,
      data: locations,
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

