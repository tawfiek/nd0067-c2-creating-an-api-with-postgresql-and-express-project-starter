import Client from '../config/db';

export type Product = {
    id: number;
    name: string;
    price: number;
};

export class ProductService {
    async index(): Promise<Product[]> {
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
}
