/** Makes all enviromental variables available globally by exporting them from here
 * 
 * @import dotenv - Serves the purpose of making all ".env" variables available to everyone through 'dotenv.config()' & 'process.env'
 * 
 * @exports JWT_SECRET_KEY - A secret key used for signing and verifying JSON Web Tokens (JWTs).
 * @exports SERVER_CONFIG - Contains server-related configuration settings. Specifically 
 *                              1.The MongoDB Atlas URL (`ATLAS_URL`) and
 *                              2.The server's port (`PORT`)
 * @exports INCOMING_MAIL_ADDRESS - The email address to be used for incoming contact attempts by the users.
 * @exports MAIL_PASSWORD - The password for above email address
 */

import * as dotenv from 'dotenv'

dotenv.config()

export const SERVER_CONFIG = {
    ATLAS_URL: process.env.ATLAS_URL,
    PORT: process.env.PORT || 3000, // Use the port from environment or fallback to 5200,
};

export const JWT_SECRET_KEY = process.env.SECRET_KEY_JWT

export const INCOMING_MAIL_ADDRESS = process.env.INCOMING_MAIL_ADDRESS
export const MAIL_PASSWORD = process.env.MAIL_PASSWORD

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD