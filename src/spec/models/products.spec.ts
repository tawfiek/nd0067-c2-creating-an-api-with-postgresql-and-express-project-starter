import { Product } from '../../@types/product';
import ProductService from '../../models/products';

describe ('Test product model', () => {
    it ('Index function must be there in the module ', () => {
        const index  = ProductService.index;

        expect(index).toBeDefined();
    });

    it ('Create function must be defined in the model', () => {
        const create = ProductService.create ;

        expect(create).toBeDefined();
    });

    it ('Get Product function must be defined in the model', () => {
        const getFunction = ProductService.getProduct;

        expect(getFunction).toBeDefined();
    });

    it ('Should Create new product successfully ', async () => {
        const product: Product = {
            name: 'Product 2',
            price: 100,
        };

        const newProduct = await ProductService.create(product);

        expect(newProduct).toBeDefined();
        expect(newProduct.name).toBe(product.name);
        expect(newProduct.price).toBe(product.price);
    });

    it ('Should get product data by id', async () => {
        const PRODUCT_ID = 1;

        const product = await ProductService.getProduct(PRODUCT_ID);

        expect(product).toBeDefined();
        expect(product.name).toBeInstanceOf(String);
        expect(product.price).toBeInstanceOf(Number);

    });

    it ('Should get product data by name', async () => {
        const products = await ProductService.index();

        expect(products).toBeDefined();
        expect(products).toBeInstanceOf(Array);
        expect(products.length).toBeGreaterThan(0);
        expect(products[0].name).toBeInstanceOf(String);
        expect(products[0].price).toBeInstanceOf(Number);
        expect(products[0].id).toBeInstanceOf(Number);
    });
});