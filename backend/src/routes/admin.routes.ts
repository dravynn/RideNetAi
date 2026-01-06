import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middlewares/auth';
import * as adminController from '../controllers/admin.controller';

const router = Router();

// All routes require authentication and admin access
router.use(requireAuth);
router.use(requireAdmin);

router.post('/groups', adminController.createGroup);
router.post('/groups/:id/assign-driver', adminController.assignDriverToGroup);
router.get('/groups', adminController.getAllGroups);

export default router;

