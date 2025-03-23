import { Router } from 'express';
import { signUp, login } from './empControllers';
import { empValidator } from '../../middleware/empValidation';

const router = Router();

router.post('/login', empValidator(), login);

router.post('/register', empValidator(), signUp);

export default router;