import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';

const app = express();

// Middlewares
app.use( cors() );
app.use(morgan('dev'));
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.set( 'port', config.PORT || 4001 );

//Routes
import UserPath from './routes/user/user.router';

app.use( '/api/user/', UserPath );

export default app;