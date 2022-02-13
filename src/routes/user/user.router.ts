import { Router } from 'express';
import { check } from 'express-validator';
import { login, register, reloadToken } from '../../controllers/user/auth.controller';
import { validateInput } from '../../middleware/validateInput';
import { TokenValidation } from '../../middleware/verifyToken';

const router = Router();

router.route('/signin')
    .post( [
        check( 'email', 'Email input is obligatory' ).isEmail(),
        check( 'password', 'Password input is obligatory' ).isLength({ min: 6 }),
        validateInput
    ], login );

router.route('/signup')
    .post( [
        check( 'name', 'Name input must not be empty' ).not().isEmpty(),
        check( 'email', 'Email input is obligatory' ).isEmail(),
        check( 'password', 'Password input is obligatory' ).isLength({ min: 6 }),
        validateInput
    ], register );

router.route('/renew')
    .get( TokenValidation, reloadToken );

export default router;