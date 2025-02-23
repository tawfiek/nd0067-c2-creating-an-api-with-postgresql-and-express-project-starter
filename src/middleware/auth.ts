import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const { TOKEN_SECRET } = process.env;

export async function authentication(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token: string = req.headers['x-access-token'] as string;

        const user = jwt.verify(token, TOKEN_SECRET as string);
        res.locals.user = user;

        return next();
    } catch (e) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }
}
