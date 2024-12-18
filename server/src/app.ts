/** Creates and configures the Express app by
 *      1. Applying Middleware
 *      2. Mounting the routers to the corresponding endpoints
 * 
 * @import express - How else are we gonna create an express app?
 * @import blogRouter, userRouter, contactRouter - They need to be imported and mounted on the corresponding endpoints, for their related requests
 * @import applyMiddleware - Purpose of using all of our general middleware on the app, while keeping it tidy somewhere else
 */
import express from "express";
import { blogRouter } from "./routes/blogs.routes";
import { userRouter } from "./routes/user.routes";
import { applyMiddleware } from "./middleware/serverMiddleware";
import { contactRouter } from "./routes/email.routes";

// Function that configures and returns an Express app
export const createApp = () => {
    //create a new instance of an Express app
    const app = express();

    // Use middleware
    applyMiddleware(app)

    //Router Mounting
    app.use("/blogs", blogRouter);
    app.use("/users", userRouter);
    app.use("/contact", contactRouter)

    //Configured Express app instance is returned
    return app;
};
