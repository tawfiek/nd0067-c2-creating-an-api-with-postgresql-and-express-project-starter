import { Order, OrderDTO } from '../@types/order';
import Client from '../config/db';

export const DEFAULT_STATUS = 'pending';
export default class OrderService {
    public static async addNewOrder(order: OrderDTO): Promise<number> {
        try {
            const conn = await Client.connect();
            const orderQuery = `
               INSERT INTO orders(order_status, user_id) VALUES  ($2, $1) RETURNING id;
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

            return orderInstant.id;
        } catch (e) {
            throw new Error(`[SERVICE] Can not add new order in DB: ${e}`);
        }
    }

    public static async getOrdersByUserID(userID: number): Promise<Order[]> {
        try {
            const conn = await Client.connect();
            const query = `
                SELECT
                    orders.id as orderID,
                    users.first_name as userFirstName,
                    users.last_name as userLastName,
                    orders.order_status as orderStatus
                FROM
                    orders LEFT JOIN users ON orders.user_id = users.id
                    WHERE users.id = $1;
            `;

            const result = await conn.query(query, [userID]);
            conn.release();

            return result.rows as any as Order[];
        } catch (e) {
            throw new Error(`[ORDERS_MODEL] ${e}`);
        }
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
