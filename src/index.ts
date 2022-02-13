import app from './app';
import { connectToMongo } from './database';
connectToMongo();
app.listen( app.get('port'), () => {
    console.log(`Server on port: ${ app.get('port') }`);
});