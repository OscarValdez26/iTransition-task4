import app from './app.js';
import { SERVER_PORT } from './config.js';
import { connectDB } from './db.js';

connectDB();
app.listen(SERVER_PORT);
console.log('Server on port', SERVER_PORT);