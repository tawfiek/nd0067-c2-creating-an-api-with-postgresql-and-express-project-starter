import { User } from '../@types/users';
import Client from '../config/db';

export default class UserService {
    public static async create(user: User): Promise<Partial<User>> {
        try {
            const conn = await Client.connect();
            const query = `INSERT INTO users (first_name, last_name, password, username)
                        VALUES ($1, $2, $3, $4) RETURNING first_name, last_name, username`;
            const values = [
                user.firstName,
                user.lastName,
                user.password,
                user.username,
            ];

            const result = await conn.query(query, values);
            conn.release();
            const dbUser = result.rows[0];

            return {
                firstName: dbUser.first_name,
                lastName: dbUser.last_name,
                username: dbUser.username,
            }
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

            const dbUser = result.rows[0];

            if (!dbUser) { return null }

            return {
                firstName: dbUser.first_name,
                id: dbUser.id,
                lastName: dbUser.last_name,
                password: dbUser.password,
                username: dbUser.username,
            }
        } catch (e) {
            throw new Error(`[USER_MODEL] ${e}`);
        }
    }

    public static async getUserDataByID(id: number): Promise<Partial<User>> {
        try {
            const conn = await Client.connect();
            const query = `SELECT
                first_name,
                last_name,
                username
             FROM users WHERE id=$1`;

            const result = await conn.query(query, [id]);
            conn.release();

            const dbUser = result.rows[0];

            if (!dbUser) { return null }

            return {
                firstName: dbUser.first_name,
                lastName: dbUser.last_name,
                username: dbUser.username,
            }
        } catch (e) {
            throw new Error(`[USERS_MODEL] ${e}`);
        }
    }
}
