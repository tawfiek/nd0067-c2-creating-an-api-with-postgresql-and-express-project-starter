import exp from 'constants';
import supertest from 'supertest';
import { OrderDTO } from '../../@types/order';
import { Product } from '../../@types/product';
import { User } from '../../@types/users';
import app from '../../server';
import { getUserToken } from '../helpers/auth';

const request = supertest(app);

const user: User = {
    firstName: 'Tawfiek',
    lastName: 'Khalaf',
    password: 'tawfiek',
    username: 'user_for_order_test',
}
describe ('Test orders ', () => {
    it ('Should add new order for user ', async () => {
        const token = await getUserToken(user);
        const product: Product = {
            name: 'Product for order test',
            price: 100,
        };

        await request.post('/products').set('x-access-token', token).send(product);

        const order = {
            products: [{ productID: 1, quantity: 1 }],
        }

        const response = await request.post('/orders').set('x-access-token', token).send(order);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });

    it('SHould get orders added by the user ', async () => {
        const token = await getUserToken(user);
        const product: Product = {
            name: 'Product for order test',
            price: 100,
        };

        await request.post('/products').set('x-access-token', token).send(product);

        const order = {
            products: [{ productID: 1, quantity: 1 }],
        }

        await request.post('/orders').set('x-access-token', token).send(order);

        const response = await request.get(`/orders`).set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.orders).toBeInstanceOf(Array);
    });
});