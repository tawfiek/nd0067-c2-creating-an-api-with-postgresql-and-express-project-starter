import { Router } from 'express';
import validatorMaker from 'express-joi-validation';
import { addNewOrder, getOrdersForUser } from '../../controllers/orders';
import { authentication } from '../../middleware/auth';
import { addNewOrderSchema } from '../../schemas/orders';

const router = Router();
const validator = validatorMaker.createValidator({ });

router.post('/', validator.body(addNewOrderSchema), authentication, addNewOrder);
router.get('/', authentication, getOrdersForUser);

export default router;
