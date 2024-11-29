import * as express from "express"
import { ObjectId } from "mongodb"
import { collections } from "./database"
import { authenticateToken } from "./middleware/authMiddleware"

export const blogRouter = express.Router()

blogRouter.use(express.json())

//RESPONSES are usually .json({message: }) TO THE FRONT END (instead of .send(message) BECAUSE I FOUND OUT THE HARD WAY THAT IT HELPS (DELETE EXAMPLE)

blogRouter.get("/", authenticateToken, async (_req, res) => {
    try {
        const blogs = await collections?.blogs?.find({}).toArray()
        res.status(200).send(blogs)
    } catch (error) {
        res.status(500).json({message :error instanceof Error ? error.message : "Unknown error" })
}})

blogRouter.get("/:id", authenticateToken, async (req, res) => {
    try{
        const id = req.params.id
        
        const query = {_id : new ObjectId(id)}
        if (!ObjectId.isValid(id)) {
            res.status(400).json({message : "not a valid id of blog"})
            return
        }
        const blog = await collections.blogs?.findOne(query)
        if (blog) {
            res.status(200).send(blog)
        } else {
            res.status(404).json({message : (`failed to find blog with id ${id}`)})
        }
    } catch {
        res.status(500).json({message : (`Server Error. Try again later.`)})
    }
})

blogRouter.post("/", authenticateToken, async (req, res) => {
    try {
        const blog = req.body;
            
        if (!blog.date) {
            blog.date = new Date();
        }
        const result = await collections?.blogs?.insertOne(blog);

        if (result?.acknowledged) {
            res.status(201).json({message : `Created a new blog: ID ${result.insertedId}.`});
        } else {
            res.status(500).json({message : ("Failed to create new blog.")});
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({message : (error instanceof Error ? error.message : "Unknown error")});
    }
});

blogRouter.patch("/:id", authenticateToken, async (req, res) => {
    try {
        const id = req?.params?.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({message :("not a valid id of blog") })
            return
        }
        const blog = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collections?.blogs?.updateOne(query, { $set: blog });

        if (result && result.matchedCount) {
            res.status(200).json({message : (`Updated blog with ID ${id}.`)});
        } else if (!result?.matchedCount) {
            res.status(404).json({message : (`Failed to find blog ID ${id}`)});
        } else {
            res.status(500).json({message : (`Failed to update an employee: ID ${id}`)});
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).json({message});
    }
})
// Add a comment to a specific blog
blogRouter.post("/:id/comments", authenticateToken, async (req, res) => {
    try {
        const blogId = req?.params?.id;
        const { userId, commentBody } = req.body;
        console.log("here they are ",blogId, req.body)

        if (!ObjectId.isValid(blogId)) {
            res.status(400).json({ message: "Invalid blog ID" });
            return
        }

        const user = await collections?.users?.findOne(
            { _id: new ObjectId(userId) },
            { projection: { username: 1 } } // Retrieve only the username field
        );
        
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        
        const username = user.username;

        const newComment = {
            username,
            date: new Date(),
            commentBody
        };
        console.log('this is the comment: ', newComment)

        const result = await collections?.blogs?.updateOne(
            { _id: new ObjectId(blogId) },
            { $push: { comments: newComment } }
        );
        
        


        if (result && result.matchedCount) {
            res.status(200).json({message: `updated blog with id ${blogId}`});
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});


blogRouter.delete("/:id",authenticateToken, async (req, res) => {
    try {
        const id = req?.params?.id;
        if (!ObjectId.isValid(id)) {
            res.status(400).json({message :("not a valid id of blog") })
            return
        } 
        const query = { _id: new ObjectId(id) };
        const result = await collections?.blogs?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).json({message :"Deleted", _id: id })
        } else if (!result) {
            res.status(400).json({message :(`Failed to delete blog with ID ${id}`) });
        } else if (!result.deletedCount) {
            res.status(404).json({message :(`Failed to find blog with ID ${id}`) });
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        console.error(message);
        res.status(400).json({message});
    }
});
