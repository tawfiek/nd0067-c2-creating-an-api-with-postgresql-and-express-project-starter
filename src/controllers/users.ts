import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import {User, UserService} from '../models/users';
import jwt from 'jsonwebtoken';

const {BCRYPT_ROUNDS, BCRYPT_SALT, TOKEN_SECRET} = process.env;

export async function signUp (req: Request, res: Response, next: NextFunction) {
    try {
        const userData = req.body;
        const hashedPassword = hashPassword(userData.password);

        userData.password = hashedPassword;
        await UserService.create(userData);

        return res.status(201).json({success: true});
    } catch (e) {
        next(e);
    }
}


export async function login (req: Request, res: Response, next: NextFunction) {
    try {
        const {username, password} = req.body;

        const userFromDB = await UserService.getUserData(username);

        if (!userFromDB || !userFromDB.length) {
            return res.status(401).json({message: 'Invalid Username or Password'});
        }

        const hashedPassword = hashPassword(password);

        if (password !== hashedPassword) {
            return res.status(401).json({message: 'Invalid Username or Password'});
        }

        const token = jwt.sign(userFromDB[0], TOKEN_SECRET as string);

        return res.status(200).json({token});
    } catch (e) {
        next(e);
    }
}

export function getUserData (req: Request, res: Response, next: NextFunction) {
}


function hashPassword (password: string): string {
if (!BCRYPT_ROUNDS || !BCRYPT_SALT) {
throw new Error('Missing BCRYPT_SALT or BCRYPT_ROUNDS');
}

return bcrypt.hashSync(password + BCRYPT_SALT, BCRYPT_ROUNDS as string);
}
