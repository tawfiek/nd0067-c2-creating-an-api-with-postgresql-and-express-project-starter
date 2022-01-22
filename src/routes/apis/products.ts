import { Router } from 'express';
import {
    addNewProduct,
    getAllProducts,
    getProduct,
} from '../../controllers/products';
import { authentication } from '../../middleware/auth';

const router = Router();

router.get('/', authentication, getAllProducts);
router.get('/:id', authentication, getProduct);
router.post('/', authentication, addNewProduct);

export default router;
