//if it's dev environment then server will be on localhost,but if it's live then on some url, so get your backend url from vercel.
//wait server had some errors now i have fixed it.
// NODE_OPTIONS='--import ...' is a way to tell Node to automatically import a module before running your app, often used for monitoring tools like Sentry or OpenTelemetry.
// That syntax only works on Linux/Mac — Windows doesn’t support inline environment variables like that.
// You can fix it using cross-env, but that still fails in environments like Electron or some managed runtimes.
// The simplest and most universal approach is just importing the module manually at the top of your entry file (e.g., server.js):
//soo we removed NODE_OPTIONS='--import ./instrument.mjs' or cross-env NODE_OPTIONS='--import ./instrument.mjs'

// now let's get back to setting up authProvider 
//our server is runnign on https://slack-backend-flame.vercel.app
import axios from 'axios';

const BASE_URL = import.meta.env.MODE === "development" ?"http://localhost:5001" : "https://slack-backend-flame.vercel.app/api" 

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true//it means that on every single request just include the credentials.
    // basically we'll send our token in the headers.
    //now create a providers folder and AuthProvider.jsx
})