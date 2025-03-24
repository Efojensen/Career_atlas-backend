import Router from 'express';
import upload from '../../middleware/multer';
import { createJob, getAllJobs } from './jobControllers';
import { validateJobData } from '../../middleware/jobValidation';
import { empVerifyToken, verifyToken } from '../../middleware/authMiddleware';

const router = Router()

router.get('/', verifyToken(), getAllJobs)

router.post('/post', upload.single('jobImage'), validateJobData(), empVerifyToken(), createJob);

export default router;