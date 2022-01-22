import { Router } from 'express';
import {signUp, login, getUserData} from '../../controllers/users';
import { authentication } from '../../middleware/auth';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/:userID', authentication, getUserData);

export default router;
