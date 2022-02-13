import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Config from '../config';

export interface IPayload {
    id: string;
    name: string;
}

export const TokenValidation = ( req: Request, res: Response, next: NextFunction ) => {

    try {
        
        const token = req.header('token');
        
        if(!token) return res.status(401).json('Access Denied');
        
        const payload = jwt.verify(token, Config.JWT_SEED || '') as IPayload;

        req.userId  = payload.id;
        req.name    = payload.name;

        next();

    } catch ( ex ) {
        res.status(400).send('Invalid Token');
    }

}