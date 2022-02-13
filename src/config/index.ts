import dotenv from 'dotenv';
dotenv.config();

export default {
    MONGODB_DATABASE_URL: process.env.MONGO_DATABASE_URL,
    PORT: process.env.PORT || 4000
}