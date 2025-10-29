import { generateStreamToken } from "../config/stream.js"
export const getStreamToken = async (req, res) => {
    
    try {
        const {userId} = req.auth(); //this req.auth() is available to us only because of the clerkMiddleware that we called in server.js
        // console.log("userId from Clerk:", userId); 
        const token = generateStreamToken(userId)
        // console.log("generated stream token:", token);
        res.status(200).json({token});//wrapping this token with {} as on the frontend we're expecting something like response.data.token

    } catch (error) {
        console.error("Error generating stream token", error)
        res.status(500).json({
            message: "Failed to generate Stream Token."
        })
    }
}//now go to chatroute.