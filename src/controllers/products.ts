import { NextFunction, Request, Response } from 'express';
import { Product, ProductService } from '../models/products';

export async function getAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const products = await ProductService.index();
        return res.status(200).json({ products, success: true });
    } catch (error) {
        next(error);
    }
}

export async function getProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const productID: number = +req.params.id;
        const product = await ProductService.getProduct(productID);
        return res.status(200).json({ product, success: true });
    } catch (error) {
        next(error);
    }
}

export async function addNewProduct(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const product: Product = req.body;
        const newProduct = await ProductService.create(product);
        return res.status(200).json({ newProduct, success: true });
    } catch (error) {
        next(error);
    }
}
