import { connect } from 'mongoose';
import config from '../config/index';

const connectToMongo = async() => {

    try {
        
        const db = await connect(`${ config.MONGODB_DATABASE_URL }`);
        console.log(`Connected to: ${ db.connection.name } database`);

    } catch ( ex ) {
        console.log( ex );
    }

}

export { connectToMongo };