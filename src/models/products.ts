import { Product } from '../@types/product';
import Client from '../config/db';
export class ProductService {
    public static async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect();
            const query = 'SELECT * FROM products';
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        } catch (e) {
            throw new Error(`Can not index products ${e}`);
        }
    }

    public static async create(product: Product): Promise<Product> {
        try {
            const conn = await Client.connect();
            const query =
                'INSERT INTO products (name, price) VALUES ($1, $2) RETURNING *';
            const values = [product.name, product.price];
            const result = await conn.query(query, values);
            return result.rows[0];
        } catch (e) {
            throw new Error(`Can not create product ${e}`);
        }
    }

    public static async getProduct(id: number): Promise<Product> {
        try {
            const conn = await Client.connect();
            const query = 'SELECT * FROM products WHERE id = $1';
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows[0];
        } catch (e) {
            throw new Error(`Can not index products ${e}`);
        }
    }
}
