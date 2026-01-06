import { Router } from 'express';
import { requireAuth } from '../middlewares/auth';
import * as trackingController from '../controllers/tracking.controller';

const router = Router();

// All routes require authentication
router.use(requireAuth);

router.post('/location', trackingController.recordLocation);
router.get('/trips/:tripId/locations', trackingController.getTripLocations);

export default router;

