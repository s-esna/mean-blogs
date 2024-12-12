import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET_KEY } from "../config/env";

//The following 4 lines were the most painful
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
export interface CustomRequest extends Request {
    user?: {
        _id: string,
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

        // Log the token to inspect it (for debugging purposes)
        console.log("Token being verified:", token);

        const decoded = jwt.verify(token, JWT_SECRET_KEY) as {
            _id: string;
            isAdmin: boolean;
        };

        // Log the decoded user data to confirm it's being decoded properly
        console.log("Decoded user data:", decoded);
        

        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.error("Invalid Token:", err);
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
    
};