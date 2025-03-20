import Router from 'express'
import { validateUsrData } from '../../middleware/validation';
import { signIn, signUp, getAllUsers, signInWithGoogle } from './userControllers';

const router = Router()

router.get('/', getAllUsers)

router.post('/register', validateUsrData(), signUp);

router.post('/login', validateUsrData(), signIn);

router.post('/signUp', validateUsrData(), signInWithGoogle);

export default router;