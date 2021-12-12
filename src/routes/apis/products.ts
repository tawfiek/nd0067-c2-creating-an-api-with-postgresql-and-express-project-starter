import { Router } from 'express';
import { addNewProduct, getAllProducts, getProduct } from '../../controllers/products';

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProduct);
router.post('/', addNewProduct);

export default router;
