/**
 * This file defines the routes for handling user-related operations, such as 
 * registering, logging in, retrieving user information, and managing user data.
 * It uses middleware for authentication, rate-limiting, and admin checks.
 * 
 * @import express: The express module for routing and middleware handling.
 * @import { authenticateToken }: Middleware for authenticating users with JWT tokens.
 * @import { limiter }: Middleware to rate-limit login attempts to prevent abuse.
 * @import { getAllEmailsController, getAllUsersController, getUsernameByUserIdController, loginUserController, registerUserController }: Controllers to handle user-related requests.
 * @import { checkAdmin }: Middleware to ensure the user is an admin for certain routes.
 */

import * as express from "express"
import { authenticateToken} from "../middleware/authMiddleware"
import { limiter } from "../middleware/limiter"
import { getAllEmailsController, getAllUsersController, getUsernameByUserIdController, loginUserController, registerUserController } from "../controllers/userController"
import { checkAdmin } from "../middleware/isAdmin"

export const userRouter = express.Router()

//GET ALL USERS
userRouter.get("/", authenticateToken, checkAdmin, getAllUsersController)

//POST USER (REGISTER)
userRouter.post('/register', registerUserController);

//POST USER (LOGIN)
userRouter.post('/login', limiter, loginUserController);

//GET USERNAME BY USERID
userRouter.get("/username", authenticateToken, getUsernameByUserIdController)

//GET ALL EMAILS
userRouter.get("/emails", authenticateToken, checkAdmin, getAllEmailsController)