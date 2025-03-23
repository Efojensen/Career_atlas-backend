import Router from 'express';
import { createJob, getAllJobs } from './jobControllers';
import { validateJobData } from '../../middleware/jobValidation';
import { empVerifyToken, verifyToken } from '../../middleware/authMiddleware';

const router = Router()

router.get('/', verifyToken(), getAllJobs)

router.post('/post', validateJobData(), empVerifyToken(), createJob);

export default router;