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

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users with pagination
 *     description: Retrieve a paginated list of all users. Requires Authentication and admin privileges.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: The page number for pagination (default is 1).
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: The number of users per page (default is 5).
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Successfully retrieved paginated list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   description: The list of users.
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f4f1a256bcc2d6f97"
 *                       username:
 *                         type: string
 *                         example: "john_doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       hashed_password:
 *                         type: string
 *                         example: "$2b$10$JppztV4U/6lJYldxcllAduFA1QaPvVF51hgANIfF55vslzdQ5XBseW"
 *                       birthDay:
 *                         type: number
 *                         example: 15
 *                       birthMonth:
 *                         type: number
 *                         example: 5
 *                       birthYear:
 *                         type: number
 *                         example: 1990
 *                       isAdmin:
 *                         type: boolean
 *                         example: false
 *                 total:
 *                   type: integer
 *                   description: The total number of users in the database.
 *                   example: 20
 *                 page:
 *                   type: integer
 *                   description: The current page number.
 *                   example: 1
 *                 totalPages:
 *                   type: integer
 *                   description: The total number of pages.
 *                   example: 4
 *       400:
 *         description: Bad request. Invalid query parameters.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT or non-admin user.
 *       500:
 *         description: Internal server error.
 */
userRouter.get("/", authenticateToken, checkAdmin, getAllUsersController)

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user by providing username, email, password, and optionally birthday details. Admin status is set to false by default.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user. Must not containt the '@' sign. Must be at least 4 characters long.
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 description: The email address of the user. Must be a valid email format.
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 description: The password of the user. Must be at least 8 characters long, and contain 1 uppercase and 1 lowercase letter, 1 digit and 1 symbol
 *                 example: "j()Hnd0e"
 *               birthDay:
 *                 type: number
 *                 description: Optional birth day of the user (01-31).
 *                 example: 15
 *               birthMonth:
 *                 type: number
 *                 description: Optional birth month of the user (01-12).
 *                 example: 5
 *               birthYear:
 *                 type: number
 *                 description: Optional birth year of the user.
 *                 example: 1990
 *     responses:
 *       201:
 *         description: User successfully registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Inserted user successfully with ID 60c72b2f4f1a256bcc2d6f97"
 *       400:
 *         description: Bad request. Username or email already exists, or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Username exists"
 *       500:
 *         description: Internal server error. An error occurred during registration.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error. Please try again later."
 */
userRouter.post('/register', registerUserController);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user using their email or username and password. A JWT token is returned upon successful login.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailOrUsername
 *               - password
 *             properties:
 *               emailOrUsername:
 *                 type: string
 *                 description: The email or username of the user.
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Login successful. Returns a JWT token and user details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Login Successful"
 *                 token:
 *                   type: string
 *                   description: The JWT token for authorization.
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 loggedUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: User's ID.
 *                       example: "60c72b2f4f1a256bcc2d6f97"
 *                     username:
 *                       type: string
 *                       description: User's username.
 *                       example: "john_doe"
 *                     email:
 *                       type: string
 *                       description: User's email.
 *                       example: "john.doe@example.com"
 *                     isAdmin:
 *                       type: boolean
 *                       description: Whether the user is an admin.
 *                       example: false
 *                     birthday:
 *                       type: string
 *                       description: User's birthday in DD-MM-YYYY format.
 *                       example: "15-05-1990"
 *       400:
 *         description: Bad request. Missing required fields or invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please provide both username/email and password"
 *       404:
 *         description: Not Found. User does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No such username or email exists"
 *       429:
 *         description: Too many login attempts. Rate-limited.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "You tried too many times to Login. Try again later"
 *       500:
 *         description: Internal server error. An error occurred during login.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
userRouter.post('/login', limiter, loginUserController);

/**
 * @swagger
 * /users/username:
 *   get:
 *     summary: Get username by user ID
 *     description: Retrieve the username of a user by their unique user ID. This endpoint requires a valid JWT token.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose username is to be fetched.
 *         example: ""
 *     responses:
 *       200:
 *         description: Successfully retrieved the username.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: The username of the user.
 *                   example: "john_doe"
 *       400:
 *         description: Bad request. The `userId` parameter is required.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT.
 *       404:
 *         description: User not found. No user exists with the provided `userId`.
 *       500:
 *         description: Internal server error. Could not retrieve username due to server issues.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "could not get username"
 */
userRouter.get("/username", authenticateToken, getUsernameByUserIdController)

/**
 * @swagger
 * /users/emails:
 *   get:
 *     summary: Get all user emails
 *     description: Retrieves all user emails from the database. This endpoint requires a valid JWT token and admin privileges.
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all user emails.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emails:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: A list of user emails.
 *                   example: ["user1@example.com", "user2@example.com"]
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT.
 *       404:
 *         description: No users found. The database is empty or no emails were retrieved.
 *       500:
 *         description: Internal server error. Failed to fetch emails due to server issues.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch emails"
 */
userRouter.get("/emails", authenticateToken, checkAdmin, getAllEmailsController)