import supertest from 'supertest';
import { User } from '../../@types/users';
import app from '../../server';


const request = supertest(app);

export function loginUser (username: string, password: string): Promise<any> {
    return request.post('/users/login').send({ username, password });
}


export function signup (body: User): Promise<any> {
    return request.post('/users/signup').send(body);
}

export async function getUserToken (user: User): Promise<string> {
    await signup(user);
    const result = await loginUser(user.username, user.password);

    return result.body.token;
}