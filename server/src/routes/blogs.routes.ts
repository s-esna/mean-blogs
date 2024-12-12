import * as express from "express"
import { authenticateToken } from "../middleware/authMiddleware"
import { createBlogController, createCommentController, deleteBlogController, getAllBlogsController, getBlogsByTagController, getSingleBlogController, updateBlogController } from "../controllers/blogController"
import { checkAdmin } from "../middleware/isAdmin"

export const blogRouter = express.Router()

//RESPONSES are usually .json({message: }) TO THE FRONT END (instead of .send(message) BECAUSE I FOUND OUT THE HARD WAY THAT IT HELPS (DELETE EXAMPLE)

//GET ALL BLOGS
blogRouter.get("/", authenticateToken, getAllBlogsController)

//GET SINGLE BLOG
blogRouter.get("/:id", authenticateToken, getSingleBlogController)

//GET BLOGS BY TAG
blogRouter.get('/tagged/:tag', authenticateToken, getBlogsByTagController)

//CREATE SINGLE BLOG 
blogRouter.post('/', authenticateToken, checkAdmin ,createBlogController);

//UPDATE BLOG
blogRouter.patch('/:id', authenticateToken, checkAdmin, updateBlogController)

//POST SINGLE COMMENT ON BLOG (UPDATE BLOG)
blogRouter.post('/:id/comments', authenticateToken, createCommentController)

//DELETE BLOG BY ID
blogRouter.delete("/:id",authenticateToken, checkAdmin, deleteBlogController)
