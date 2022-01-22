import { Router } from 'express';
import { getUserData, login, signUp } from '../../controllers/users';
import { authentication } from '../../middleware/auth';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.get('/:userID', authentication, getUserData);

export default router;
