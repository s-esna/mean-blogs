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
