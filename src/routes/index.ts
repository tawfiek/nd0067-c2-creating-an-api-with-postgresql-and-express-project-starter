import { Router } from 'express';
import productsRouter from './apis/products';
import ordersRouter from './apis/orders';
import usersRouter from './apis/users';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/orders', ordersRouter);
routes.use('/users', usersRouter);

export default routes;
