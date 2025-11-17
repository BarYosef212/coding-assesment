import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import { saveOnboarding, getOnboarding } from '../controllers/onboardingController.js';

const router = Router();

router.use(authenticate);

router.post('/', saveOnboarding);

router.get('/', getOnboarding);

export default router;
