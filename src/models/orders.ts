import { Order } from '../@types/order';
import Client from '../config/db';

export const DEFAULT_STATUS = 'pending';
export class OrderService {
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

    private static parseOrder (order: any): Order {
         return {
                    id: order.id,
                    userFirstName: order.first_name,
                    userLastName: order.last_name,
                    userID: order.user_id,
                    orderStatus: order.order_status,
                }
    }
}