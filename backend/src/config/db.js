import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connectDB =async ()=>{
    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI)
        // console.log("Mongodb connected successfully.", conn.connection.host)
        //as we don't need to see the host in our console log
    } catch (error) {
        console.log("Error connecting to mongodb.", error);
        process.exit(1);//status code 1 means error and 0 means success.
    }
}//now let's call this connect to db function in server.js.