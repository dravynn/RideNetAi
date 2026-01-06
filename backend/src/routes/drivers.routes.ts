import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/auth';
import * as driversController from '../controllers/drivers.controller';

const router = Router();

// All routes require authentication and admin access
router.use(requireAuth);
router.use(requireAdmin);

router.get('/pending', driversController.getPendingDrivers);
router.post('/:id/approve', driversController.approveDriver);
router.get('/', driversController.getAllDrivers);

export default router;

