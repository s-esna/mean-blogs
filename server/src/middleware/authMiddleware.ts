import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

//The following 4 lines were the most painful
// https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
export interface CustomRequest extends Request {
    user?: {
        _id: string,
        isAdmin: boolean
    }
}

const SECRET_KEY = process.env.SECRET_KEY_JWT
if (!SECRET_KEY) {
    console.log('secret key could not be found')
    process.exit(1)
}


export const authenticateToken = async (req: CustomRequest, res: Response, next: NextFunction)  => {
    

    const token = req.header('Authorization')?.replace('Bearer ', '');
    
   

    if (!token) {
        res.status(401).json({ message: "Access Denied: No Token Provided" });
        return
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY) as {
            _id: string;
            isAdmin: boolean;
        };
        

        req.user = decoded; // Attach user data to the request object
        next(); // Proceed to the next middleware or route
    } catch (err) {
        console.error("Invalid Token:", err);
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
    
};