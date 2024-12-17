// import * as nodemailer from "nodemailer"
const nodemailer = require('nodemailer')
import { ObjectId } from "mongodb";
import { collections } from "../config/database";
import { INCOMING_MAIL_ADDRESS, MAIL_PASSWORD } from "../config/env";

export async function emailService(message: string, userEmail:string) {
    try {
        // Set up Nodemailer transport using your email provider (e.g., Gmail, SMTP, etc.)
        const transporter = nodemailer.createTransport({
          service: 'gmail', // Example: Use Gmail (use 'SMTP' settings for custom providers)
          auth: {
            user: INCOMING_MAIL_ADDRESS, // Replace with your email
            pass: MAIL_PASSWORD   // Replace with your email app password (not personal password)
          }
        });
        // Email options
        const mailOptions = {
          from: INCOMING_MAIL_ADDRESS,    // Sender's email address
          to: INCOMING_MAIL_ADDRESS, // Recipient's email address
          subject: 'New Message from Contact Form',
          text: message ,               // Message content from the user
          replyTo: userEmail
        };
    
        // Send the email
        const result = await transporter.sendMail(mailOptions);
        return result; // Return result for confirmation
      } catch (error) {
        throw error; // Propagate error to the caller
    }
    
}

//GET EMAIL BY USERID
export async function getEmailByUserIdService(userId : string) {
    try {
        const user = await collections?.users?.findOne(
            { _id: new ObjectId(userId) },
            { projection: { email: 1 } } // Retrieve only the email field
        );

        return user?.email
    } catch (err) {
        console.error('could not fetch user', err)
        throw new Error('Error while looking for user in DB')
    }
}