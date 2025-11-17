import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { saveFeedback, getLastFeedback } from '../controllers/feedbackController.js';

const router = Router();

router.use(authenticate);

router.post('/', saveFeedback);

router.get('/', getLastFeedback);

export default router;
