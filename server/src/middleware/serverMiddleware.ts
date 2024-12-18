/**
 * Configures and applies general middleware to the Express app.
 * This function is responsible for adding middleware that should be applied globally across all routes.
 * Common middleware like CORS handling and JSON body parsing are configured here.
 * 
 * @import cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) to allow requests from different origins.
 * @import express.json: Middleware for parsing incoming request bodies as JSON.
 * 
 * @param app - The Express application instance that middleware will be applied to.
 * 
 * @todo Add JWT authentication middleware: The JWT authentication middleware is planned to be added here in the future.
 */

import express from 'express'
import cors from 'cors'

export const applyMiddleware = (app: express.Application) => {
    //I can add middleware i want to use here
    //TODO, JWT AUTHENTICATION HERE
    app.use(cors());
    app.use(express.json())
}