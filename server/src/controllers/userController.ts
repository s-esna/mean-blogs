import { Request, Response } from "express"; 
import { ObjectId } from "mongodb";
import { getAllUsersService } from "../services/userService";

export async function getAllUsersController(req: Request, res: Response) {
    try {
        const users = await getAllUsersService()    
        res.status(200).send(users)
    } catch (err) {
        res.status(500).json({message :err instanceof Error ? err.message : "Unknown error" })
    }
}