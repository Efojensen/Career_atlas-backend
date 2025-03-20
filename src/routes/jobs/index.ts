import Router from 'express';
import { verifyToken } from '../../middleware/authMiddleware';
import { validateJobData } from '../../middleware/jobValidation';
import { createJob } from './jobControllers';

const router = Router()

router.post('/post', verifyToken(), validateJobData(), createJob);

export default router;