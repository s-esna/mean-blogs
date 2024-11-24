import * as dotenv from "dotenv";
import cors from "cors"
import { connectToDatabase } from "./database";
import express from "express"
import { blogRouter } from "./blogs.routes";
import { userRouter } from "./user.routes";

dotenv.config()

const ATLAS_URL = process.env.ATLAS_URL 



async function startServer() {
    
    try{

        if (!ATLAS_URL) {
            console.error("There is no such URL")
            process.exit(1)
        }
        await connectToDatabase(ATLAS_URL);
        const app = express()

        //Middleware
        app.use(cors())
        app.use("/blogs", blogRouter)
        app.use("/users", userRouter)
    
        app.listen(5200, () => {
            console.log("listening for requests on port 5200")
        })
    } catch {
        console.error("error starting the server")
    }
}

startServer()