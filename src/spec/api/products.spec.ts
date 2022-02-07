import supertest from 'supertest';
import { Product } from '../../@types/product';
import { User } from '../../@types/users';
import app from '../../server';
import { getUserToken } from '../helpers/auth';

const request = supertest(app);

describe ('Test products endpoints', () => {
    const user: User = {
        firstName: 'Tawfiek',
        lastName: 'Khalaf',
        password: 'tawfiek',
        username: 'user_for_product_test',
    };
    it ('Should add new endpoint successfully ', async () => {
        const token = await getUserToken(user);

        const product: Product = {
            name: 'Product 1',
            price: 100,
        };

        const response = await request.post('/products').set('x-access-token', token).send(product);

        expect(response.status).toBe(200);
    });


    it ('Should get the product data by id', async () => {
        const token = await getUserToken(user);
        const product: Product = {
            name: 'Product 2',
            price: 100,
        };

        await request.post('/products').set('x-access-token', token).send(product);

        const response = await request.get(`/products/1`).set('x-access-token', token);

        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it ('Should get all products', async () => {
        const token = await getUserToken(user);
        const product: Product = {
            name: 'Product 3',
            price: 100,
        };

        await request.post('/products').set('x-access-token', token).send(product);

        const response = await request.get(`/products`).set('x-access-token', token);

        console.log('#DEBUG ', response.body);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.products).toBeInstanceOf(Array);
        expect(response.body.products.length).toBeGreaterThanOrEqual(1);
    });
});


