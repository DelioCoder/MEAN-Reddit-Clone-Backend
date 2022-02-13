import jwt from 'jsonwebtoken';
import config from '../config';
import { User } from '../model/user/user.model';

export function generateJWT( user: User ): string {

    return jwt.sign({
        id: user.id,
        name: user.name
    },config.JWT_SEED || '',
    { expiresIn: '1h' })

}