import { OrderDTO } from '../../@types/order';
import { Product } from '../../@types/product';
import OrderService from '../../models/orders';
import ProductService from '../../models/products';

describe('Test order model', () => {
    it('Get order function must be there in the module ', () => {
        const index = OrderService.getOrdersByUserID;

        expect(index).toBeDefined();
    });

    it ('Create function must be defined in the model', () => {
        const create = OrderService.addNewOrder

        expect(create).toBeDefined();
    });

    it ('Should Create new order successfully ', async () => {
        const product: Product = {
            name: 'Product 1',
            price: 100,
        };

        const newProduct = await ProductService.create(product);

        const order: OrderDTO = {
            products: [{ productID: 1, quantity: 1 }],
            userID: 1,
        };

        const orderID = await OrderService.addNewOrder(order);


        expect(orderID).toBeInstanceOf(Number);
    });
});