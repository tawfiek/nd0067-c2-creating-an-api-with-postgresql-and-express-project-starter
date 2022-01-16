import bcrypt from 'bcrypt';
import Client from '../config/db';

export type User = {
    firstName: string,
    lastName: string,
    password: string,
}
export class UserService  {

    public static async  create (user: User): Promise<User> {
         try {
            const conn = await Client.connect();
            const query =
                'INSERT INTO products (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';
            const values = [user.firstName, user.lastName, user.password];
            const result = await conn.query(query, values);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Can not index products ${e}`);
        }
    }

    public static async getUserData (userName: string): Promise<User[]> {
            try {
            const conn = await Client.connect();
            const query =
                'SELECT * FROM users WHERE username=$1';

            const result = await conn.query(query, [userName]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Can not index products ${e}`);
        }
    }
}