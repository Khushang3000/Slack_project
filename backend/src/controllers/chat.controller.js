import { generateStreamToken } from "../config/stream.js"
import * as Sentry from '@sentry/node';

export const getStreamToken = async (req, res) => {
    
    try {
        const {userId} = req.auth; //this req.auth is available to us only because of the clerkMiddleware that we called in server.js
        
        if (!userId) {
            console.error("userId not found in request auth");
            Sentry.captureMessage("Stream token request without userId", "warning");
            return res.status(401).json({message: "Unauthorized - userId not found"});
        }
        
        const token = generateStreamToken(userId)
        
        if (!token) {
            console.error("Failed to generate stream token for userId:", userId);
            Sentry.captureMessage("Stream token generation returned null", "error", {
              tags: { component: "chat.controller" },
              extra: { userId },
            });
            return res.status(500).json({message: "Failed to generate Stream Token."});
        }
        
        res.status(200).json({token});

    } catch (error) {
        console.error("Error generating stream token:", error)
        Sentry.captureException(error, {
          tags: { component: "chat.controller" },
          extra: { context: "generate_stream_token" },
        });
        res.status(500).json({
            message: "Failed to generate Stream Token."
        })
    }
}