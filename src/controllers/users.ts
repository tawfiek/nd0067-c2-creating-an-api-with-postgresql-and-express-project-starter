import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../@types/users';
import UserService from '../models/users';

const { BCRYPT_ROUNDS, TOKEN_SECRET } = process.env;

export async function signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const userData: User = req.body;
        const hashedPassword = await hashPassword(userData.password);

        userData.password = hashedPassword;
        await UserService.create(userData);

        return res.status(201).json({ success: true });
    } catch (e) {
        return next(e);
    }
}

export async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { username, password } = req.body;

        const userFromDB = await UserService.getUserData(username);

        if (!userFromDB) {
            return res
                .status(401)
                .json({ message: 'Invalid Username or Password' });
        }

        const isValidPassword = await validatePassword(
            password,
            userFromDB.password
        );

        if (!isValidPassword) {
            return res
                .status(401)
                .json({ message: 'Invalid Username or Password' });
        }

        const token = jwt.sign(userFromDB, TOKEN_SECRET as string);

        return res.status(200).json({ token });
    } catch (e) {
        next(e);
    }
}

export async function getUserData(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const userID: number = +req.params.userID;

        if (isNaN(userID)) {
            return res.status(400).json({
                message: 'User ID is not valid',
            });
        }

        const userData = await UserService.getUserDataByID(userID);

        return res.status(200).json(userData);
    } catch (e) {
        next(e);
    }
}

async function hashPassword(password: string): Promise<string> {
    if (!BCRYPT_ROUNDS) {
        throw new Error('Missing BCRYPT_ROUNDS');
    }

    const salt = await bcrypt.genSalt(+BCRYPT_ROUNDS as number);

    return bcrypt.hashSync(password, salt);
}

async function validatePassword(
    plainPassword: string,
    password: string
): Promise<boolean> {
    return bcrypt.compare(plainPassword, password);
}
