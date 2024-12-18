/**
 * Middleware for checking if the authenticated user has admin privileges.
 * This middleware ensures that only users with an `isAdmin` flag set to `true` can access 
 * certain routes that are restricted to admins. If the user is not an admin, it returns 
 * a 403 Forbidden error with an appropriate message.
 * 
 * @import { Request, Response, NextFunction }: Express types for the request, response, and next function.
 * 
 * @interface CustomRequest: Extends the default Express `Request` interface to include the `user` object, 
 *                            which holds information about the authenticated user, including their `_id` and `isAdmin` status.
 * 
 * @function checkAdmin: This function checks if the user is authenticated and if their `isAdmin` property is set to `true`. 
 *                       If the user is not an admin or the `user` object is absent, it returns a 403 error. If the user is an admin, 
 *                       it calls the `next` function to proceed with the request.
 * 
 * @param req - The request object, extended with the `user` property containing user data.
 * @param res - The response object, used to send a 403 Forbidden error if the user is not an admin.
 * @param next - The next middleware function to call if the user is authorized as an admin.
 */


import { Request, Response, NextFunction } from "express";
export interface CustomRequest extends Request {
    user?: {
        _id: string,
        isAdmin: boolean
    }
}

export const checkAdmin = (req: CustomRequest, res: Response, next: NextFunction) => {

    if (!req.user || req.user.isAdmin !== true) {
        res.status(403).json({ message: "Access Denied: Admins Only" });
        return
    }

    next(); 
};
