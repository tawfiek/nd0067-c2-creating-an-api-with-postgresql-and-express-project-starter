import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const {TOKEN_SECRET} = process.env;

export async function authentication (req: Request, res: Response, next: NextFunction) {
    try {
        const token: string = req.headers['x-access-token'] as string;

        jwt.verify(token, TOKEN_SECRET as string);

        return next();
    } catch (e) {
        return res.status(401).json({message: 'You are not authenticated'});
    }
}