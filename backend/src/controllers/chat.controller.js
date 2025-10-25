import { generateStreamToken } from "../config/stream.js"
export const getStreamToken = async (req, res) => {
    try {
        const token = getStreamToken(req.auth().userId); //this req.auth() is available to us only because of the clerkMiddleware that we called in server.js
        res.status(200).json(token);

    } catch (error) {
        console.error("Error generating stream token", error)
        res.statue(500).json({
            message: "Failed to generate Stream Token."
        })
    }
}//now go to chatroute.