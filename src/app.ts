import express from 'express';
import cors from 'cors';
import config from './config';

const app = express();

app.use( cors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.set( 'port', config.PORT || 4001 );

export default app;