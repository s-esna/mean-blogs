/**
 * This file defines the route for handling email-related requests, specifically
 * the sending of messages through the contact form. The route expects a user to
 * be authenticated before sending an email.
 * 
 * @import express: The express module to define and handle routing.
 * @import { authenticateToken }: Middleware to authenticate users via JWT tokens.
 * @import { emailController }: Controller that handles sending the email.
 */

import * as express from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { emailController } from "../controllers/emailController"

export const contactRouter = express.Router()

//Send Email through Contact Form
contactRouter.post('/message', authenticateToken, emailController)