/** Makes all enviromental variables available globally by exporting them from here
 * 
 * @import dotenv: Serves the purpose of making all variables available to everyone through '@dotenv.config()'
 * 
 * 
 * @exports JWT_SECRET_KEY: standalone secret key for Jason Web Tokens to be used in other parts of the app
 * @exports SERVER_CONFIG: Server-related variables grouped together (PORT & ATLAS_URL as {SERVER_CONFIG})
 */

import * as dotenv from 'dotenv'

dotenv.config()

export const SERVER_CONFIG = {
    ATLAS_URL: process.env.ATLAS_URL,
    PORT: process.env.PORT || 3000, // Use the port from environment or fallback to 5200,
};

export const JWT_SECRET_KEY = process.env.SECRET_KEY_JWT