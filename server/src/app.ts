/** Creates and configures the express app
 * 
 * @import express: How else are we gonna create an express app?
 * @import blogRouter, userRouter: They need to be imported and mounted on the corresponding endpoints
 * @import applyMiddleware: Purpose of using all of our general middleware on the app, while keeping it tidy somewhere else
 */
import express from "express";
import { blogRouter } from "./routes/blogs.routes";
import { userRouter } from "./routes/user.routes";
import { applyMiddleware } from "./middleware/serverMiddleware";

// Function that configures and returns an Express app
export const createApp = () => {
    const app = express();

    // Use middleware
    applyMiddleware(app)

    //Router Mounting
    app.use("/blogs", blogRouter);
    app.use("/users", userRouter);

    return app;
};
