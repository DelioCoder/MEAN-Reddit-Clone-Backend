import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator';

export const validateInput = ( req: Request, res: Response, next: NextFunction ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }
    
    next();

}