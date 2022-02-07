import { Router } from 'express';
import validatorMaker from 'express-joi-validation';
import {
    addNewProduct,
    getAllProducts,
    getProduct,
} from '../../controllers/products';
import { authentication } from '../../middleware/auth';
import { addNewProductSchema } from '../../schemas/products';

const router = Router();

const validator = validatorMaker.createValidator({ });

router.get('/', authentication, getAllProducts);
router.get('/:id', authentication, getProduct);
router.post('/',
    validator.body(addNewProductSchema),
    authentication,
    addNewProduct
);


export default router;
