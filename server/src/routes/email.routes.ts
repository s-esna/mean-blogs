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

/**
 * @swagger
 * /contact/message:
 *   post:
 *     summary: Send a message to the system via email (hard to test this endpoint, but works)
 *     description: This endpoint allows an authenticated user to send a message to the admin's email address. The user's email is retrieved using their user ID from the token. Since emails cannot be sent from unauthorized email addresses, the end-email is sent from the admin to the admin (from:admin, to:admin). For this reason, the "reply-to" section contains the actual user's email. This endpoint is hard to explain and even harder to test, because you need 2-step-verification for the admin's email enabled, as well as an 'app specific password'. Check .env for more details.
 *     tags:
 *       - Email
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message content to be sent via email.
 *             required:
 *               - message
 *             example:
 *               message: "This is a test message sent via the contact form."
 *     responses:
  *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 info:
 *                   type: object
 *                   description: Details of the email sent
 *                   properties:
 *                     accepted:
 *                       type: array
 *                       items:
 *                         type: string
 *                     rejected:
 *                       type: array
 *                       items:
 *                         type: string
 *                     ehlo:
 *                       type: array
 *                       items:
 *                         type: string
 *                     envelopeTime:
 *                       type: number
 *                     messageTime:
 *                       type: number
 *                     messageSize:
 *                       type: number
 *                     response:
 *                       type: string
 *                     envelope:
 *                       type: object
 *                       properties:
 *                         from:
 *                           type: string
 *                         to:
 *                           type: array
 *                           items:
 *                             type: string
 *                     messageId:
 *                       type: string
 *             example:
 *               success: true
 *               info: 
 *                 accepted: 
 *                   - "your.examplemail@gmail.com"
 *                 rejected: []
 *                 ehlo: 
 *                   - "SIZE 35882577"
 *                   - "8BITMIME"
 *                   - "AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH"
 *                   - "ENHANCEDSTATUSCODES"
 *                   - "PIPELINING"
 *                   - "CHUNKING"
 *                   - "SMTPUTF8"
 *                 envelopeTime: 1366
 *                 messageTime: 1787
 *                 messageSize: 399
 *                 response: "250 2.0.0 OK  1734798085 ffacd0b85a97d-38a1c832c45sm6767561f8f.32 - gsmtp"
 *                 envelope:
 *                   from: "your.examplemail@gmail.com"
 *                   to: 
 *                     - "your.examplemail@gmail.com"
 *                 messageId: "<ff98b5fc-02fc-f339-fd47-579730265a95@gmail.com>"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             examples:
 *               missingMessage:
 *                 value:
 *                   error: "Message content is required."
 *               missingEmail:
 *                 value:
 *                   error: "Email is required."
 *               missingUserId:
 *                 value:
 *                   error: "User ID not found in token."
 *       401:
 *         description: Unauthorized - Token missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Unauthorized."
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *             example:
 *               error: "Failed to send email."
 */
contactRouter.post('/message', authenticateToken, emailController);
