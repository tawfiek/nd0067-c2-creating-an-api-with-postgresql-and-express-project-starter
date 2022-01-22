import { Router } from 'express';
import { addNewOrder } from '../../controllers/orders';
import { authentication } from '../../middleware/auth';

const router = Router();

router.post('/', authentication, addNewOrder);

export default router;
