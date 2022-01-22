import { Router } from 'express';
import ordersRouter from './apis/orders';
import productsRouter from './apis/products';
import usersRouter from './apis/users';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);
routes.use('/users', usersRouter);

export default routes;
