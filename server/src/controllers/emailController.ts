import { Request, Response } from "express"; 
import { emailService } from "../services/emailService";
import { getEmailByUserIdService } from "../services/emailService";
import { CustomRequest } from "../middleware/authMiddleware";

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