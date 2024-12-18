/**
 * Controller for handling email-related API requests, specifically sending an email.
 * 
 * @import { emailService }: Service to send an email.
 * @import { getEmailByUserIdService }: Service to fetch the email associated with a user ID.
 * @import { CustomRequest }: Custom request interface with user information from the JWT token.
 */

import { Response } from "express"; 
import { emailService } from "../services/emailService";
import { getEmailByUserIdService } from "../services/emailService";
import { CustomRequest } from "../middleware/authMiddleware";


/**
 * Sends an email on behalf of an authenticated user.
 * 
 * This controller expects a message in the request body and uses the user ID from the authenticated token
 * to retrieve the user's email address. It then calls the email service to send the message.
 * 
 * @param req - The request object, which contains the 'message' in the body and uses the user ID from the token.
 * @param res - The response object, which returns a success message if the email is sent, or an error message if any validation fails or the email sending fails.
 * 
 * @returns JSON response indicating the success or failure of the email sending process.
 *          - Success: Returns `{ success: true, info: result }`
 *          - Failure: Returns appropriate error messages based on validation or service errors.
 */
export async function emailController(req: CustomRequest, res: Response) {
    const { message } = req.body; // Expecting 'message' from the request body
    const userId = req.user?.id;  // Directly access userId from the authenticated token    
    
    if (!userId) {
        res.status(400).json({ error: 'User ID not found in token.' });
        return
    }
    const userEmail = await getEmailByUserIdService(userId)
    
    if (!message || message.trim() === '') {
       res.status(400).json({ error: 'Message content is required.' });
       return
    }
    if (!userEmail || userEmail.trim() === '') {
       res.status(400).json({ error: 'Email is required' });
       return
    }
    
  
    try {
      // Call the service to send the email
      const result = await emailService(message, userEmail);
      res.status(200).json({ success: true, info: result });
      return
    } catch (error) {
      console.error('Error  email:', error);
      res.status(500).json({ error: 'Failed to send email.' });
      return
    }
}