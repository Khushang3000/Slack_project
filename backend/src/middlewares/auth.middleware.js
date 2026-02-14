import * as Sentry from '@sentry/node';

export const protectRoute = (req, res, next) => {
    if(!req.auth.isAuthenticated){
        const error = new Error("Unauthorized - user must be logged in");
        console.warn("Authentication attempt failed", {userId: req.auth?.userId});
        Sentry.captureMessage("Auth middleware rejection", "warning", {
          tags: { component: "auth.middleware" },
          extra: { isAuthenticated: req.auth?.isAuthenticated },
        });
        return res.status(401).json({message: "Unauthorized - you must be logged in"})
    }

    next();
}