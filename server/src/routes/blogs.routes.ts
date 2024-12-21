/**
 * This file defines all the routes related to blogs, including blog management 
 * (CRUD operations), blog retrieval, and comment creation.
 * 
 * @import express: The express module to define and handle routing.
 * @import { authenticateToken }: Middleware to authenticate users via JWT tokens.
 * @import { createBlogController, createCommentController, deleteBlogController, getAllBlogsController, getBlogsByTagController, getSingleBlogController, updateBlogController }: Controllers that handle the business logic for each route.
 * @import { checkAdmin }: Middleware to ensure the user has admin privileges before performing certain actions (like creating, updating, or deleting blogs).
 */

import * as express from "express"
import  {authenticateToken}  from "../middleware/authMiddleware"
import { createBlogController, createCommentController, deleteBlogController, getAllBlogsController, getBlogsByTagController, getSingleBlogController, updateBlogController } from "../controllers/blogController"
import { checkAdmin } from "../middleware/isAdmin"

export const blogRouter = express.Router()

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Retrieve all blogs
 *     description: Retrieve a paginated list of blogs based on search criteria. Requires authentication.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number to retrieve (default is 1).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of blogs to retrieve per page (default is 3).
 *         required: false
 *         schema:
 *           type: integer
 *           default: 3
 *       - name: query
 *         in: query
 *         description: A search string to filter blogs by title or body.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of blogs with pagination info.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       body:
 *                         type: string
 *                       img:
 *                         type: string
 *                         description: Optional image for the blog
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Tags associated with the blog
 *                       comments:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             username:
 *                               type: string
 *                             date:
 *                               type: string
 *                               format: date-time
 *                             commentBody:
 *                               type: string
 *                 totalDocuments:
 *                   type: integer
 *                   description: Total number of Blogs
 *                 page:
 *                    type: integer
 *                    description: The current page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT.
 *       400:
 *         description: Invalid page or limit parameters.
 *       500:
 *         description: Server error.
 */
blogRouter.get("/", authenticateToken, getAllBlogsController)

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Retrieve a single blog
 *     description: Get a single blog post by its MongoDB id. Requires authentication.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: The unique ID of the blog post.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The requested blog post.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The unique identifier of the blog.
 *                 title:
 *                   type: string
 *                   description: The title of the blog.
 *                 body:
 *                   type: string
 *                   description: The main content of the blog.
 *                 img:
 *                   type: string
 *                   description: An optional image URL for the blog.
 *                 date:
 *                   type: string
 *                   format: date-time
 *                   description: The date the blog was created or updated.
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *                   description: Tags associated with the blog.
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                       date:
 *                         type: string
 *                         format: date-time
 *                       commentBody:
 *                         type: string
 *       400:
 *         description: Invalid blog ID provided.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Internal server error.
 */
blogRouter.get("/:id", authenticateToken, getSingleBlogController)

/**
 * @swagger
 * /blogs/tagged/{tag}:
 *   get:
 *     summary: Retrieve blogs by tag
 *     description: Fetch all blogs that have a specific tag. Requires authentication.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: tag
 *         in: path
 *         description: The tag to search blogs for.
 *         required: true
 *         schema:
 *           type: string
 *       - name: page
 *         in: query
 *         description: The page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: The number of blogs per page for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           default: 3
 *     responses:
 *       200:
 *         description: List of blogs that match the specified tag.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 blogs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The unique identifier of the blog.
 *                       title:
 *                         type: string
 *                         description: The title of the blog.
 *                       body:
 *                         type: string
 *                         description: The main content of the blog.
 *                       img:
 *                         type: string
 *                         description: An optional image URL for the blog.
 *                       tags:
 *                         type: array
 *                         items:
 *                           type: string
 *                         description: Tags associated with the blog.
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: The date the blog was created or updated.
 *                 totalDocuments:
 *                   type: integer
 *                   description: Total number of Blogs
 *                 page:
 *                    type: integer
 *                    description: The current page
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages available.
 *       400:
 *         description: Invalid pagination parameters provided.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT.
 *       404:
 *         description: No blogs found for the specified tag.
 *       500:
 *         description: Internal server error.
 */
blogRouter.get('/tagged/:tag', authenticateToken, getBlogsByTagController)

/**
 * @swagger
 * /blogs/:
 *   post:
 *     summary: Create a new blog
 *     description: Adds a new blog to the collection. Requires authentication and admin privileges.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the blog. 
 *                 example: "Understanding Swagger"
 *               body:
 *                 type: string
 *                 description: The main content of the blog.
 *                 example: "Swagger is necessary for unhindered communication between teams"
 *               img:
 *                 type: string
 *                 description: An optional image URL for the blog.
 *                 example: "https://avatars.githubusercontent.com/u/7658037?v=4"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the blog.
 *                 example: ["Swagger", "Endpoints"]
 *     responses:
 *       201:
 *         description: Blog successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: "Created a new blog with Id: 60c72b2f4f1a256bcc2d6f97"
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT. Admins Only.
 *       500:
 *         description: Internal server error. Failed to create a new blog.
 */ 
blogRouter.post('/', authenticateToken, checkAdmin ,createBlogController);

/**
 * @swagger
 * /blogs/{id}:
 *   patch:
 *     summary: Update a blog by ID
 *     description: Updates the details of a blog using its ID. Requires authentication and admin privileges.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to update.
 *         schema:
 *           type: string
 *           example: ""
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the blog.
 *                 example: "Updated Blog Title"
 *               body:
 *                 type: string
 *                 description: The updated content of the blog.
 *                 example: "This is the updated content of the blog."
 *               img:
 *                 type: string
 *                 description: An updated image URL for the blog.
 *                 example: "https://www.csoonline.com/wp-content/uploads/2023/06/software_update_by_gocmen_gettyimages-1146311500_2400x1600-100852481-orig.jpg?quality=50&strip=all"
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated tags for the blog.
 *                 example: ["UpdatedTag1", "UpdatedTag2"]
 *     responses:
 *       200:
 *         description: Blog successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message.
 *                   example: "Updated blog with ID 60c72b2f4f1a256bcc2d6f97."
 *       400:
 *         description: Bad request. Invalid blog ID or missing title/body.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT. Admins Only.
 *       404:
 *         description: Blog not found with the provided ID.
 *       500:
 *         description: Internal server error. Failed to update the blog.
 */
blogRouter.patch('/:id', authenticateToken, checkAdmin, updateBlogController)

/**
 * @swagger
 * /blogs/{id}/comments:
 *   post:
 *     summary: Add a comment to a blog
 *     description: Adds a new comment to a specific blog. Requires authentication.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to which the comment will be added.
 *         schema:
 *           type: string
 *           example: ""
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user adding the comment.
 *                 example: ""
 *               commentBody:
 *                 type: string
 *                 description: The body of the comment.
 *                 example: "This is a new comment."
 *     responses:
 *       200:
 *         description: Comment successfully added. Returns the updated blog.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: The ID of the blog.
 *                   example: "60c72b2f4f1a256bcc2d6f97"
 *                 title:
 *                   type: string
 *                   description: Title of the blog.
 *                   example: "Sample Blog Title"
 *                 body:
 *                   type: string
 *                   description: Content of the blog.
 *                   example: "This is a sample blog post."
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         description: Username of the commenter.
 *                         example: "User123"
 *                       date:
 *                         type: string
 *                         format: date-time
 *                         description: Date the comment was posted.
 *                         example: "2023-12-21T15:30:00Z"
 *                       commentBody:
 *                         type: string
 *                         description: The body of the comment.
 *                         example: "Great blog post!"
 *       400:
 *         description: Bad request. Invalid blog ID, empty comment, or missing user.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT.
 *       404:
 *         description: Blog or user not found.
 *       500:
 *         description: Internal server error. Failed to add the comment.
 */
blogRouter.post('/:id/comments', authenticateToken, createCommentController)

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog by ID
 *     description: Deletes a blog post by its ID. Requires authentication and admin privileges.
 *     tags:
 *       - Blogs
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the blog to be deleted.
 *         schema:
 *           type: string
 *           example: ""
 *     responses:
 *       202:
 *         description: Blog successfully deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message.
 *                   example: "Deleted"
 *                 _id:
 *                   type: string
 *                   description: The ID of the deleted blog.
 *                   example: "60c72b2f4f1a256bcc2d6f97"
 *       400:
 *         description: Bad request. Invalid blog ID or deletion error.
 *       401:
 *         description: Unauthorized. Access Denied. JWT is missing.
 *       403:
 *         description: Forbidden. Access Denied. Invalid or Expired JWT. Admins only.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Internal server error. Failed to delete the blog.
 */
blogRouter.delete("/:id",authenticateToken, checkAdmin, deleteBlogController)
