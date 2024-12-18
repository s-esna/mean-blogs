/**
 * Middleware for authenticating and verifying JWT tokens in incoming requests.
 * This middleware ensures that requests to protected routes are made by authorized users 
 * with valid tokens, and it attaches the decoded user information to the request object 
 * for further use in subsequent middleware or route handlers.
 * 
 * @import { Request, Response, NextFunction }: Express types for the request, response, and next function.
 * @import jwt: JSON Web Token library to verify the authenticity of the token.
 * @import { JWT_SECRET_KEY }: The secret key used for signing and verifying JWT tokens.
 * 
 * @interface CustomRequest: Extends the default Express `Request` interface to include the `user` object,
 *                            which holds the decoded token data, such as the user ID and admin status.
 * 
 * @function authenticateToken: This function checks for the presence of a JWT token in the `Authorization` 
 *                              header of the request. If the token is valid, it decodes it and attaches the 
 *                              decoded user information to the `request` object. If the token is absent or invalid,
 *                              it returns a 401 or 403 response with an appropriate error message.
 * 
 * @param req - The request object, extended with the `user` property.
 * @param res - The response object, used to send a 401 or 403 error if authentication fails.
 * @param next - The next middleware function to call if authentication is successful.
 */


import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config/env";

//The following 4 lines were the most painful
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
export interface CustomRequest extends Request {
    user?: {
        id: string,
        isAdmin: boolean
    }
}

export const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction)  => {
    if (!JWT_SECRET_KEY) {
        console.log('secret key could not be found')
        process.exit(1)
    }
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        res.status(401).json({ message: "Access Denied: No Token Provided" });
        return
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
            id: string;
            isAdmin: boolean;
        };
        
        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.error("Invalid Token:", err);
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
    
};