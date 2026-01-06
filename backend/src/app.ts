import express, { Express } from 'express';
import cors from 'cors';
import { config } from './config';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

// Routes
import parentsRoutes from './routes/parents.routes';
import driversRoutes from './routes/drivers.routes';
import adminRoutes from './routes/admin.routes';
import trackingRoutes from './routes/tracking.routes';
import webhooksRoutes from './routes/webhooks.routes';

export function createApp(): Express {
  const app = express();

  // Middleware
  app.use(cors({
    origin: config.server.corsOrigin,
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Health check
  app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Routes
  app.use('/api/parents', parentsRoutes);
  app.use('/api/drivers', driversRoutes);
  app.use('/api/admin', adminRoutes);
  app.use('/api/tracking', trackingRoutes);
  app.use('/api/webhooks', webhooksRoutes);

  // Error handling
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

