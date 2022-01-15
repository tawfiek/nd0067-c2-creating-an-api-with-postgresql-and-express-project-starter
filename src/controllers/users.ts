import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import {User, UserService} from '../models/users';

export async function signUp (req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body;

        await UserService.create(userData);

        return res.status(201).json({success: true});
    } catch (e) {
        next(e);
    }
}
