import { NextFunction } from "express";
import jwt from "jsonwebtoken"
// const SECRET_KEY = process.env.SECRET_KEY_JWT

// export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//     const authHeader = req.headers['authorization']; // Get the token from the Authorization header
//     const token = authHeader && authHeader.split(" ")[1]; // Extract the token from "Bearer <token>"

//     if (!token) {
//          res.status(401).json({ message: "Access Denied: No Token Provided" });
//          return
//     }

//     try {
//         const decoded = jwt.verify(token, SECRET_KEY); // Verify the token
//         req.user = decoded; // Attach decoded payload (e.g., id, isAdmin) to `req.user`
//         next(); // Proceed to the next middleware or route handler
//     } catch (err) {
//         console.error("Invalid Token", err);
//         res.status(403).json({ message: "Invalid or Expired Token" });
//     }
// };