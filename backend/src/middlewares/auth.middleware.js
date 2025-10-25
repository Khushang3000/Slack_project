export const protectRoute = (req, res, next) => {
    if(!req.auth().isAuthenticated){
        //if user is not authenticated(this is not stream authentication, but clerk authentication)
        return res.status(401).json({message: "Unauthorized - you must be logged in"})
    }

    // if user is authenticated then just call the next()
}