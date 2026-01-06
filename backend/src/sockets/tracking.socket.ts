import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { TrackingService } from '../services/tracking.service';
import { supabaseAdmin } from '../lib/supabase';

const trackingService = new TrackingService();

export function setupTrackingSocket(io: SocketIOServer): void {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;

      if (!token) {
        return next(new Error('Authentication token required'));
      }

      // Verify token with Supabase
      const {
        data: { user },
        error,
      } = await supabaseAdmin.auth.getUser(token);

      if (error || !user) {
        return next(new Error('Invalid token'));
      }

      // Attach user to socket
      (socket as any).user = user;
      next();
    } catch (error) {
      next(new Error('Authentication failed'));
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    // Join trip room
    socket.on('join-trip', async (tripId: string) => {
      try {
        const trip = await trackingService.getActiveTripSession(tripId);

        if (!trip) {
          socket.emit('error', { message: 'Trip not found or not active' });
          return;
        }

        socket.join(`trip:${tripId}`);
        socket.emit('joined-trip', { tripId });

        // Send recent locations
        const locations = await trackingService.getTripLocations(tripId);
        socket.emit('location-history', locations);
      } catch (error) {
        socket.emit('error', { message: 'Failed to join trip' });
      }
    });

    // Leave trip room
    socket.on('leave-trip', (tripId: string) => {
      socket.leave(`trip:${tripId}`);
      socket.emit('left-trip', { tripId });
    });

    // Driver sends location update
    socket.on('location-update', async (data: {
      trip_session_id: string;
      latitude: number;
      longitude: number;
      accuracy?: number;
      speed?: number;
      heading?: number;
    }) => {
      try {
        const location = await trackingService.recordLocation(
          data.trip_session_id,
          data
        );

        // Broadcast to all clients in the trip room
        io.to(`trip:${data.trip_session_id}`).emit('location-update', location);
      } catch (error) {
        socket.emit('error', { message: 'Failed to record location' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
}

