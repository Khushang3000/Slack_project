import mongoose from 'mongoose';
import { ENV } from './env.js';
import * as Sentry from '@sentry/node';

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.MONGODB_URI);
        console.log("MongoDB connected successfully.");
        return conn;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        Sentry.captureException(error, {
            tags: { component: "db.config" },
            extra: { context: "database_connection", mongoUri: ENV.MONGODB_URI ? "present" : "missing" },
        });
        process.exit(1);
    }
}