import { Router } from 'express';
import { addNewOrder, getOrdersForUser } from '../../controllers/orders';
import { authentication } from '../../middleware/auth';

const router = Router();

router.post('/', authentication, addNewOrder);
router.get('/', authentication, getOrdersForUser);

export default router;
