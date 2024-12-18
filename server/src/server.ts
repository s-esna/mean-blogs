/**
 * Entry point of my server.
 * 
 * This file initializes the server by connecting to the database, setting up the express application, 
 * and listening for incoming requests. The primary responsibilities are to ensure the database connection 
 * and start the Express server.
 * 
 * 
 * @import connectToDatabase - Handles connecting to the database.
 *      The actual connection string and logic are abstracted in `database.ts`.
 * 
 * @import SERVER_CONFIG - Imports environmental variables required for the server.
 *      These variables (e.g., database URL and port) are defined in the `.env` file and loaded in the `env.ts` file.
 *      This allows configuration to be managed separately from the application logic.
 * 
 * @import createApp - Configures the express app, applies middleware, and sets up routers.
 *      This function encapsulates the logic for creating the app, keeping the `server.ts` focused on server-specific tasks.
 */

import { connectToDatabase } from "./config/database";
import { SERVER_CONFIG } from "./config/env";
import { createApp } from "./app";

// Destructures the two environmental variables from SERVER_CONFIG for server startup. 
const {ATLAS_URL, PORT} = SERVER_CONFIG;


/**
 * Starts the server application by ensuring the database connection is established 
 * and then creating and listening on the Express app.
 * 
 * Errors are caught and logged in the console.
 */
async function startServer() {
    
    try{

        // Makes sure the MongoDB connection string is available; exits if not.
        if (!ATLAS_URL) {
            console.error("There is no such URL")
            process.exit(1)
        }

        //Connects to the database based on the provided URL
        await connectToDatabase(ATLAS_URL);

        //Creates express App, Applies General Middleware and configures the routes
        const app = createApp();
        
        app.listen(PORT, () => {
            console.log(`listening for requests on port ${PORT}`)
        })
    } catch (err) {
        console.error("error starting the server", err)
    }
}

startServer()