/**
 * Entry point of my server. Server starts here
 * @import connectToDatabase: Connecting to the database is the job of someone else (database.ts)
 * @import SERVER_CONFIG (from env.ts file): Loading enviromental variables here directly is unnecessary. All of them are loaded elsewhere (env.ts).
 *          Here only the necessary .env variables are made accessible through this import
 * @import createApp: configures the express app and applies middleware. Not necessary to be done here
 */

import { connectToDatabase } from "./config/database";
import { SERVER_CONFIG } from "./config/env";
import { createApp } from "./app";


const {ATLAS_URL, PORT} = SERVER_CONFIG;

async function startServer() {
    
    try{

        //Makes sure the Atlas URL exists, otherwise shuts down
        if (!ATLAS_URL) {
            console.error("There is no such URL")
            process.exit(1)
        }

        //Connects to the database based on the URI
        await connectToDatabase(ATLAS_URL);

        //Creates express App, Applies General Middleware and mounts the routers
        const app = createApp();
        
        app.listen(PORT, () => {
            console.log(`listening for requests on port ${PORT}`)
        })
    } catch (err) {
        console.error("error starting the server", err)
    }
}

startServer()