import { RequestHandler } from "express";
import User from '../../model/user/user.model';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../../util/generateJWT';

export const login: RequestHandler = async( req, res ) => {

    try {
      
        const user = await User.findOne({ email: req.body.email });

        if ( !user ) return res.status(401).send({ msg: 'Wrong credentialss!' });

        const match = await bcrypt.compare( req.body.password, user.password );
        
        if ( !match ) return res.status(401).send({ msg: 'Wrong credentialssssss!' });

        const token = generateJWT( user );

        res.status(201).send({
            ok: true,
            id: user.id,
            username: user.name,
            email: user.email,
            token
        });

    } catch ( ex ) {
        res.send( ex );
    }

}

export const register: RequestHandler = async( req, res ) => {

    try {

        const emailExist = await User.findOne({ email: req.body.email });

        if ( emailExist ) return res.status(400).send({ msg: 'This email is already taken' });

        const salt = bcrypt.genSaltSync(10);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync( req.body.password, salt ),
        });

        const savedUser = await newUser.save();

        const token = generateJWT( savedUser );

        res.send({
            ok: true,
            id: savedUser.id,
            username: savedUser.name,
            email: savedUser.email,
            token
        });
        
    } catch ( ex ) {
        res.send( ex );
    }

}

export const reloadToken: RequestHandler = async( req, res ) => {

    const { userId, name } = req;

    const dbUser = await User.findById( userId );

    if ( !dbUser ) return res.send({ msg: 'User not found' });

    const token = generateJWT( dbUser! );

    return res.status(201).send({
        ok: true,
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        token
    });

}