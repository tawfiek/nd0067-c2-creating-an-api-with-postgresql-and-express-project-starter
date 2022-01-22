import { NextFunction, Request, Response } from "express";
import { Order, OrderDTO } from "../@types/order";
import {OrderService} from '../models/orders';

export async function addNewOrder (req: Request, res: Response, next: NextFunction) {
    try {
        const order: OrderDTO = {products:  req.body, userID: res.locals.user.id};

        await OrderService.addNewOrder(order);

        return res.status(200).json({success: true});
    } catch(e) {
        next(e);
    }
}