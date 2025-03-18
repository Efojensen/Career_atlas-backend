import Router from 'express'
import { validateUsrData } from '../../middleware/validation';
import { signIn, signUp, getAllUsers } from './userControllers';

const router = Router()

router.get('/', getAllUsers)

router.post('/register', validateUsrData(), signUp);

router.post('/login', signIn);

export default router;