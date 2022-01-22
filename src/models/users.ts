import { User } from '../@types/users';
import Client from '../config/db';

export class UserService {
    public static async create(user: User): Promise<User> {
        try {
            const conn = await Client.connect();
            const query = `INSERT INTO users (first_name, last_name, password, username)
                        VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [
                user.firstName,
                user.lastName,
                user.password,
                user.username,
            ];
            const result = await conn.query(query, values);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Can not creat new user ${e}`);
        }
    }

    public static async getUserData(userName: string): Promise<User> {
        try {
            const conn = await Client.connect();
            const query = 'SELECT * FROM users WHERE username=$1';

            const result = await conn.query(query, [userName]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Can not index products ${e}`);
        }
    }

    public static async getUserDataByID(id: number): Promise<User> {
        try {
            const conn = await Client.connect();
            const query = `SELECT
                first_name as firstName,
                last_name as lastName,
                username
             FROM users WHERE id=$1`;

            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Can not index products ${e}`);
        }
    }
}
