import { Request, Response } from "express"; 
import { getAllEmailsService, getAllUsersService, getUsernameByUserIdService, loginUserService, registerUserService } from "../services/userService";

//GET ALL USERS PAGINATED
export async function getAllUsersController(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 5

        if (page < 1 || limit < 1) {
            res.status(400).json({message: "Page and limit must be positive ints"})
            return
        }

        const {users, total} = await getAllUsersService(page, limit)
        const totalPages = Math.ceil(total/ limit)
        
        res.status(200).json({
            users,
            total,
            page,
            totalPages
        })
    } catch (err) {
        res.status(500).json({message :err instanceof Error ? err.message : "Unknown error" })
    }
}

//POST USER (REGISTER)
export async function registerUserController(req: Request, res: Response) {
    try {
        const user = req.body;
        const result = await registerUserService(user);

        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(result.status).json({ message: result.message });
        }
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
}

//POST USER (LOGIN)
export async function loginUserController(req: Request, res: Response) {
    try {
        const loginAttempt = req.body;

        const result = await loginUserService(loginAttempt);

        if (result.success) {
            res.status(200).json({
                message: result.message,
                token: result.token,
                loggedUser: result.loggedUser,
            });
        } else {
            res.status(result.status).json({ message: result.message });
        }
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'An unexpected error occurred' });
    }
}

//GET USERNAME BY USERID
export async function getUsernameByUserIdController(req: Request, res: Response) {
    try{
        const userId = req.query.userId as string
        const username = await getUsernameByUserIdService(userId)
        if (!username) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({username})
    } catch {
        res.status(500).json({message: "could not get username"})
    }
}

//GET ALL EMAILS
export async function getAllEmailsController(req: Request, res: Response) {
    try {
        const users = await getAllEmailsService() 
    
        if (!users || users.length === 0) {
           res.status(404).json({ message: 'No users found' });
           return
        }
    
        const emails = users.map(user => user.email); // Extract emails from users
        res.status(200).json({emails: emails});
      } catch (err) {
        console.error('Error fetching emails:', err);
        res.status(500).json({ message: 'Failed to fetch emails' });
      }
    };
