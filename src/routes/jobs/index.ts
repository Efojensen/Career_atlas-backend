import Router from 'express';
import { createJob, getAllJobs } from './jobControllers';
import { verifyToken } from '../../middleware/authMiddleware';
import { validateJobData } from '../../middleware/jobValidation';

const router = Router()

router.get('/', verifyToken(), getAllJobs)

router.post('/post', verifyToken(), validateJobData(), createJob);

export default router;