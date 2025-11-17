import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { getDashboard,fetchAIInsight } from '../controllers/dashboardController.js';

const router = Router();

router.use(authenticate);

router.get('/', getDashboard);
router.get('/ai', fetchAIInsight)

export default router;
