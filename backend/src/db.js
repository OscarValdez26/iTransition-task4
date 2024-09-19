import moongose from 'mongoose';
import { DATABASE_HOST } from './config.js';

export const connectDB = async () => {
    try {
        await moongose.connect(DATABASE_HOST);
        console.log("DB Conected");
    }
    catch (error) {
        console.log(error);
    }
}