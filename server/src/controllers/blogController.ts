import { Request, Response } from "express"; 
import { createBlogService, createCommentService, deleteBlogService, getAllBlogsService, getBlogsByTagService, getSingleBlogService, getUsernameByUserId, updateBlogService } from "../services/blogService";
import { ObjectId } from "mongodb";


//GET ALL
export async function getAllBlogsController(req: Request, res: Response) {
    try {
        // const {limit, page} = req.query
        // const paginationParameters = {
        //     limit: parseInt(limit as string) ||  10,
        //     page: parseInt(page as string) ||  1
        // }

        // const blogs = await getAllBlogsService(paginationParameters)
        const blogs = await getAllBlogsService()
        res.status(200).send(blogs)
    } catch (err) {
        res.status(500).json({message :err instanceof Error ? err.message : "Unknown error" })
    }    
}

//GET SINGLE BLOG
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
export async function getBlogsByTagController(req: Request, res: Response) {
    try{
        const tag = req.params.tag

        const blogs = await getBlogsByTagService(tag)

        if (blogs && blogs.length > 0) {
            res.status(200).send(blogs)
        } else {
            res.status(404).json({message : (`failed to find blogs with tag ${tag}`)})
        }
    }    catch {
        res.status(500).json({message : (`Server Error. Try again later.`)})
    }
}

//CREATE SINGLE BLOG
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

        const username = await getUsernameByUserId(userId)       
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
            res.status(200).json({message: `updated blog with id ${blogId}`});
        } else {
            res.status(404).json({ message: "comment could not be made" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

//DELETE BLOG BY ID
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