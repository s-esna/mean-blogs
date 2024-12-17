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
    console.log('Received Token:', token); // Log token to make sure it's being passed correctly
    if (!token) {
        res.status(401).json({ message: "Access Denied: No Token Provided" });
        return
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
            id: string;
            isAdmin: boolean;
        };
        console.log('Decoded Token:', decoded); // Log the decoded token to verify the user data
        
        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.error("Invalid Token:", err);
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
    
};