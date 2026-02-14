import dotenv from 'dotenv';

dotenv.config();

const requiredEnvVars = [
    'MONGODB_URI',
    'CLERK_PUBLISHABLE_KEY',
    'CLERK_SECRET_KEY',
    'STREAM_API_KEY',
    'STREAM_API_SECRET',
    'SENTRY_DSN',
    'INNGEST_EVENT_KEY',
    'INNGEST_SIGNING_KEY',
    'CLIENT_URL'
];

// Validate required environment variables
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0 && process.env.NODE_ENV === 'production') {
    console.error('Missing required environment variables:', missingVars);
    throw new Error(`Missing environment variables: ${missingVars.join(', ')}`);
}

export const ENV = {
    PORT: process.env.PORT || 5001,
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV || 'development',
    CLERKPUBLISHABLEKEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERKSECRETKEY: process.env.CLERK_SECRET_KEY,
    STREAMAPIKEY: process.env.STREAM_API_KEY,
    STREAMAPISECRET: process.env.STREAM_API_SECRET,
    SENTRY_DSN: process.env.SENTRY_DSN,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    CLIENT_URL: process.env.CLIENT_URL
}