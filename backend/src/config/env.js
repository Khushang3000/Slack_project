import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT,
    MONGODB_URI:process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
    CLERKPUBLISHABLEKEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERKSECRETKEY: process.env.CLERK_SECRET_KEY,
    STREAMAPIKEY: process.env.STREAM_API_KEY,
    STREAMAPISECRET: process.env.STREAM_API_SECRET,
    SENTRY_DSN: process.env.SENTRY_DSN,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY
}