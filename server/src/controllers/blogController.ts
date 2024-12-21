/**
 * Controller for handling blog-related API requests, including fetching, creating, updating, and deleting blogs, 
 * as well as adding comments to blogs.
 * 
 * @import { createBlogService }: Service to create a new blog.
 * @import { createCommentService }: Service to add a comment to a blog.
 * @import { deleteBlogService }: Service to delete a blog by its ID.
 * @import { getAllBlogsService }: Service to fetch all blogs with pagination.
 * @import { getBlogsByTagService }: Service to fetch blogs filtered by a tag.
 * @import { getSingleBlogService }: Service to fetch a single blog by its ID.
 * @import { updateBlogService }: Service to update a blog by its ID.
 * @import { getUsernameByUserIdService }: Service to fetch a username by user ID.
 */

import { Request, Response } from "express"; 
import { createBlogService, createCommentService, deleteBlogService, getAllBlogsService, getBlogsByTagService, getSingleBlogService, updateBlogService } from "../services/blogService";
import { ObjectId } from "mongodb";
import { getUsernameByUserIdService } from "../services/userService";


//GET ALL
/**
 * * Retrieves a paginated list of all blogs with an optional search query.
 * 
 * @param req - The request object, which can contain query parameters for pagination (page, limit) and a search query.
 * @param res - The response object, which returns a paginated list of blogs and pagination metadata.
 * @returns JSON response containing the blogs, total count, current page, and total pages.
 */
export async function getAllBlogsController(req: Request, res: Response) {
    try {
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 3
        const query = req.query.query as string || ''

        if (page < 1 || limit < 1) {
            res.status(400).json({message: "Page and limit must be positive ints"})
            return
        }

        const {blogs, totalDocuments} = await getAllBlogsService(page, limit, query)

        const totalPages = Math.ceil(totalDocuments/ limit)
        res.status(200).json({
            blogs,
            totalDocuments,
            page,
            totalPages
        })
    } catch (err) {
        res.status(500).json({message :err instanceof Error ? err.message : "Unknown error" })
    }    
}

//GET SINGLE BLOG
/**
 * * Retrieves a single blog by its ID.
 * 
 * @param req - The request object, which contains the blog ID in the URL parameters.
 * @param res - The response object, which returns the blog if found or an error message if not.
 * @returns JSON response containing the requested blog or an error message if the blog is not found.
 */
export async function getSingleBlogController(req: Request, res: Response) {
    try{
        const id = req.params.id

        if (!ObjectId.isValid(id)) {
            res.status(400).json({message : "not a valid id of blog"})
            return
        }

        const blog = await getSingleBlogService(id)

        if (blog) {
            res.status(200).send(blog)
        } else {
            res.status(404).json({message : (`failed to find blog with id ${id}`)})
        }

    } catch (err) {
        console.error("Error fetching blog:", err);
        res.status(500).json({ message: "Server error. try again later." });
    }
}

//GET BLOGS BY TAG
/**
 *  * Retrieves a list of blogs filtered by a specific tag, with pagination support.
 * 
 * @param req - The request object, which contains the tag in the URL parameters and pagination query parameters.
 * @param res - The response object, which returns the filtered list of blogs along with pagination metadata.
 * @returns JSON response containing the blogs, total count, current page, and total pages or an error message.
 */
export async function getBlogsByTagController(req: Request, res: Response) {
    try{
        const tag = req.params.tag

        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 3
        if (page < 1 || limit < 1) {
            res.status(400).json({message: "Page and limit must be positive ints"})
            return
        }
        const {blogs, totalDocuments} = await getBlogsByTagService(tag, page, limit)

        const totalPages = Math.ceil(totalDocuments/ limit)

        if (blogs && blogs.length > 0) {
            res.status(200).json({
            blogs,
            totalDocuments,
            page,
            totalPages
        })
        } else {
            res.status(404).json({message : (`failed to find blogs with tag ${tag}`)})
        }
    }    catch {
        res.status(500).json({message : (`Server Error. Try again later.`)})
    }
}

//CREATE SINGLE BLOG
/**
 *  * Creates a new blog post.
 * 
 * @param req - The request object, which contains the blog data in the body.
 * @param res - The response object, which returns a success message with the ID of the created blog or an error message.
 * @returns JSON response indicating the success or failure of blog creation.
 */
export async function createBlogController(req: Request, res: Response)  {
    try {
        const blog = req.body;

        const result = await createBlogService(blog)

        if (result.success) {
            res.status(201).json({message: `Created a new blog with Id: ${result.insertedId}`})

        } else {
            res.status(500).json({ message: "Failed to create new blog." });        
        }
    } catch (err) {
        console.error(err)
        res.status(400).json({ message: err instanceof Error ? err.message : "Unknown error" });
    }
}

//UPDATE SINGLE BLOG
/**
 * * Updates an existing blog by its ID.
 * 
 * @param req - The request object, which contains the blog ID in the URL parameters and updated blog data in the body.
 * @param res - The response object, which returns a success message or an error message if the update fails.
 * @returns JSON response indicating the success or failure of blog update.
 */
export async function updateBlogController(req: Request, res: Response) {
    try {
        const id = req?.params?.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({message :("not a valid id of blog") })
            return
        }
        const blog = req.body;
        if (!blog.title || !blog.body) {
            res.status(400).json({message : 'cannot update with no title or no body'})
            return
        }
        const result = await updateBlogService(id, blog)

        if (result?.success) {
            res.status(200).json({message : (`Updated blog with ID ${id}.`)});
        } else if (result.msg === 'not_found') {
            res.status(404).json({message : (`Failed to find blog with ID ${id}`)});
        } else {
            res.status(500).json({message : (`Failed to update the blog. Try again`)});
        }
    } catch (err) {
        console.error("Error in updateBlogController:", err);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}

//POST SINGLE COMMENT ON BLOG (UPDATE BLOG)
/**
 *  * Creates a comment on a specific blog post.
 * 
 * @param req - The request object, which contains the blog ID in the URL parameters and the comment data in the body.
 * @param res - The response object, which returns the updated blog post with the new comment or an error message.
 * @returns JSON response containing the updated blog post or an error message if the comment could not be added.
 */
export async function createCommentController(req: Request, res:Response) {
    try {
        const blogId = req?.params?.id;

        if (!ObjectId.isValid(blogId)) {
            res.status(400).json({ message: "Invalid blog ID" });
            return
        }
        const { userId, commentBody } = req.body;

        if (!commentBody || commentBody.trim() === "") {
            res.status(400).json({ message: "cannot post empty comment" });
            return
        }

        const username = await getUsernameByUserIdService(userId)       
        if (!username) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        
        const newComment = {
            username,
            date: new Date(),
            commentBody : commentBody.trim()
        };

        const result = await createCommentService(blogId, newComment)
        
        if (result.success) {
            // Fetch and return the updated blog
            const updatedBlog = await getSingleBlogService(blogId);
            if (updatedBlog) {
                res.status(200).json(updatedBlog); // Send back the updated blog
            } else {
                res.status(404).json({ message: "Blog not found after update" });
            }
        } else {
            res.status(404).json({ message: "Comment could not be added" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

//DELETE BLOG BY ID
/**
 * * Deletes a blog by its ID.
 * 
 * @param req - The request object, which contains the blog ID in the URL parameters.
 * @param res - The response object, which returns a success message or an error message if the blog could not be deleted.
 * @returns JSON response indicating the success or failure of the blog deletion.
 */
export async function deleteBlogController(req: Request, res:Response) {
    try {
        const id = req.params.id
        if (!ObjectId.isValid(id)) {
            res.status(400).json({message :("not a valid id of blog") })
            return
        }

        const result = await deleteBlogService(id)
        if (result) {
            if (result.success) {
                res.status(202).json({message :"Deleted", _id: id })
            } else if (result.msg === 'not_found') {
                res.status(404).json({message :(`Failed to find blog with ID ${id}`) });
            } else {
                res.status(400).json({message :(`Failed to delete blog with ID ${id}`) });
    
            }
        }
        
    } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error in db try again";
        console.error(message);
        res.status(500).json({message});
    }
}