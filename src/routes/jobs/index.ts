import Router from 'express';
import upload from '../../middleware/multer';
import { createJob, getAllJobs } from './jobControllers';
import { validateJobData } from '../../middleware/jobValidation';
// import { empVerifyToken, verifyToken } from '../../middleware/authMiddleware';

const router = Router()

//ORIGINAL: router.get('/', verifyToken(), getAllJobs)
router.get('/', getAllJobs)

//ORIGINAL: router.post('/post', upload.single('jobImage'), validateJobData(), empVerifyToken(), createJob);
router.post('/post', upload.single('jobImage'), validateJobData(), createJob);

export default router;