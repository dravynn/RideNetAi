import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/auth';
import * as parentsController from '../controllers/parents.controller';

const router = Router();

// All routes require authentication and PARENT role
router.use(requireAuth);
router.use(requireRole('PARENT'));

router.post('/students', parentsController.createStudent);
router.get('/students', parentsController.getStudents);
router.get('/subscription', parentsController.getSubscription);

export default router;

