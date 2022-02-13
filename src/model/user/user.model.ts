import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    imageUrl: String
});

export interface User {
    id      : string;
    name    : string;
    email   : string;
    password: string;
    imageUrl: string;
}

export default model<User>('User', userSchema);