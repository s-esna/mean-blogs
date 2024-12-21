/**
 * Controller for handling user-related API requests, including user registration, login, retrieval, and email fetching.
 * Each function corresponds to a specific route and HTTP method in the user API.
 * 
 * @import { getAllEmailsService }: Service to fetch all user emails.
 * @import { getAllUsersService }: Service to fetch all users with pagination.
 * @import { getUsernameByUserIdService }: Service to retrieve the username of a user by their ID.
 * @import { loginUserService }: Service to handle user login.
 * @import { registerUserService }: Service to handle user registration.
 */

import { Request, Response } from "express"; 
import { getAllEmailsService, getAllUsersService, getUsernameByUserIdService, loginUserService, registerUserService } from "../services/userService";


/** GET ALL USERS PAGINATED
 * @param req - The request object, expected to contain query parameters for pagination (page, limit).
 * @param res - The response object, which will be populated with the users, total count, current page, and total pages.
 * @returns JSON response with paginated users and metadata (total, page, totalPages).
 */

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
/**
 * Registers a new user in the system.
 * 
 * @param req - The request object, expected to contain user data in the body.
 * @param res - The response object, which will return a success or error message.
 * @returns JSON response indicating the success or failure of user registration.
 */
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
/**
 * 
 * * Logs in a user based on their credentials.
 * 
 * @param req - The request object, expected to contain login data in the body.
 * @param res - The response object, which will return a success or error message along with a JWT token if successful.
 * @returns JSON response containing a login status message, a token (if login is successful), and user data.
 */
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
/**
 * * Retrieves a user's username by their user ID.
 * 
 * @param req - The request object, expected to contain a userId query parameter.
 * @param res - The response object, which will return the username of the requested user or an error message.
 * @returns JSON response with the username or an error message if the user is not found.
 */
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
        res.status(500).json({message: "could not get username due to server issues or invalid id format"})
    }
}

//GET ALL EMAILS
/**
 * 
 * Retrieves all user emails from the database.
 * 
 * @param req - The request object, no specific parameters expected for this action.
 * @param res - The response object, which will return a list of user emails or an error message.
 * @returns JSON response with a list of user emails or an error message if no users are found.
 */
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
