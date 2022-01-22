import { Order, OrderDTO } from '../@types/order';
import Client from '../config/db';

export const DEFAULT_STATUS = 'pending';
export class OrderService {
    public static async addNewOrder(order: OrderDTO): Promise<void> {
        try {
            const conn = await Client.connect();
            const orderQuery = `
               INSERT INTO orders(order_status, user_id) VALUES  ($2, $1) RETURNING * ;
            `;
            const orderInstant = (
                await conn.query(orderQuery, [order.userID, DEFAULT_STATUS])
            ).rows[0];

            const addProductsQuery = OrderService.buildQueryToAddOrder(
                orderInstant.id,
                order.products
            );

            const result = await conn.query(addProductsQuery);

            conn.release();

            return;
        } catch (e) {
            throw new Error(`[SERVICE] Can not add new order in DB: ${e}`);
        }
    }

    public static async getOrdersByUserID(userID: number): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const query = 'SELECT * FROM products WHERE id = $1';
            const result = await conn.query(query, [userID]);
            conn.release();

            return result.rows.map(OrderService.parseOrder);
        } catch (e) {
            throw new Error(`Can not index products ${e}`);
        }
    }

    private static parseOrder(order: any): Order {
        return {
            id: order.id,
            orderStatus: order.order_status,
            userFirstName: order.first_name,
            userID: order.user_id,
            userLastName: order.last_name,
        };
    }

    private static buildQueryToAddOrder(
        orderID: number,
        products: Array<{ productID: number; quantity: number }>
    ) {
        const query = `
           	INSERT INTO order_product(order_id, product_id, quantity) VALUES
        `;
        const values = products.reduce((value, prod) => {
            return (
                value + `(${orderID}, ${prod.productID}, ${prod.quantity})\n`
            );
        }, '');

        return query + values;
    }
}
