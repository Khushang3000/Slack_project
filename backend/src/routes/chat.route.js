import express from 'express'
import { getStreamToken } from '../controllers/chat.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const router = express.Router()


//this router will give a token to the frontend saying that the user is authenticated on stream as well.
router.get("/token", getStreamToken)// this full route is /api/chat/token, and here we call the generateStreamToken. also we're protecting this route with the middleware.
//now if a token already exists this function will simply give that, ootherwise if token doesn't already exist then it'll generate the token.
//we didn't implement this functionality tho.
export default router;

//now try running and see if you catch an error, 
// now we'll integrate sentry into our app. npm i sentry. go to your sentry account, create a project.
//we already have the sentry dsn(connection string), instrument.js in src