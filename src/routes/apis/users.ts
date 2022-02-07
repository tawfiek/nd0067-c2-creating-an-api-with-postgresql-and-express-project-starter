import { Router } from 'express';
import validatorMaker from 'express-joi-validation';
import { getUserData, login, signUp } from '../../controllers/users';
import { authentication } from '../../middleware/auth';
import { addNewUSerSchema } from '../../schemas/users';

const validator = validatorMaker.createValidator({ });

const router = Router();

router.post('/signup', validator.body(addNewUSerSchema), signUp);
router.post('/login', login);
router.get('/:userID', authentication, getUserData);

export default router;
