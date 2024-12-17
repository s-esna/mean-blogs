import * as express from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { emailController } from "../controllers/emailController"

export const contactRouter = express.Router()

//Send Email through Contact Form
contactRouter.post('/message', authenticateToken, emailController)