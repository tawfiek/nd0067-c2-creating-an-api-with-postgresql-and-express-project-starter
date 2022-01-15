import bcrypt from 'bcrypt';
import Client from '../config/db';

const {BCRYPT_ROUNDS, BCRYPT_SALT} = process.env;

export type User = {
    firstName: string,
    lastName: string,
    password: string,
}
export class UserService  {

    public static async  create (user: User): Promise<User> {
         try {
            const hashedPassword = UserService.hashPassword(user.password);
            const conn = await Client.connect();
            const query =
                'INSERT INTO products (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';
            const values = [user.firstName, user.lastName, hashedPassword];
            const result = await conn.query(query, values);
            return result.rows[0];
        } catch (e) {
            throw new Error(`Can not index products ${e}`);
        }
    }

    private static hashPassword (password: string): string {
        if (!BCRYPT_ROUNDS || !BCRYPT_SALT) {
            throw new Error('Missing BCRYPT_SALT or BCRYPT_ROUNDS');
        }

        return bcrypt.hashSync(password + BCRYPT_SALT, BCRYPT_ROUNDS as string);
    }
}