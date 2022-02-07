import supertest from 'supertest';
import { User } from '../../@types/users';
import app from '../../server';
import { loginUser, signup } from '../helpers/auth';

const request = supertest(app);

describe ('Test users endpoints', () => {
    it ('Should signup new user successfully', async () => {

        const user: User = {
            firstName: 'Tawfiek',
            lastName: 'Khalaf',
            password: 'tawfiek',
            username: 'tawfiek',
        };

        const response = await signup(user);

        expect(response.status).toBe(201);
    });

    it ('Should login user successfully', async () => {

        const user: User = {
            firstName: 'Tawfiek',
            lastName: 'Khalaf',
            password: 'tawfiek',
            username: 'tawfiek2',
        };

        const signUpResults = await signup(user);

        const result = await loginUser(user.username, user.password);

        expect(signUpResults.status).toBe(201);
        expect(result.status).toBe(200);
        expect(result.body.token).toBeDefined();
        expect(result.body.token).toBeInstanceOf(String);
    });

    it ('Should not login user with invalid credentials', async () => {

        const result = await loginUser('Invalid user name', 'Invalid Password');

        expect(result.status).toBe(401);
    });


    it ('Should get the user data by id', async () => {
        const user: User = {
            firstName: 'Tawfiek',
            lastName: 'Khalaf',
            password: 'tawfiek',
            username: 'tawfiek3',
        };

        const signUpResults = await signup(user);
        const loginResult = await loginUser(user.username, user.password);

        const response = await request.get('/users/1').set('x-access-token', `${loginResult.body.token}`);

        expect(signUpResults.status).toBe(201);
        expect(loginResult.status).toBe(200);
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });
});
