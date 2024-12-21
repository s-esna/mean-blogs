import { ObjectId } from "mongodb";
import { collections } from "../config/database";
import { Blog } from "../interfaces/blogInterface";


//GET ALL
export async function getAllBlogsService (page : number, limit: number, query: string)  {

    const skip = (page - 1) * limit
    const searchCriteria = query ? {
        $or: [
            { title: { $regex: query, $options: 'i' } },  // Case-insensitive search
            { body: { $regex: query, $options: 'i' } }
        ]
    } : {};
    const blogs = await collections.blogs?.find(searchCriteria)      //Could omit passwords here, but they are encrypted anyway
        .skip(skip)
        .limit(limit)
        .toArray()
    const totalDocuments = await collections.blogs?.countDocuments(searchCriteria)

    return {
        blogs: blogs || [],
        totalDocuments: totalDocuments || 0
    }
}

//GET SINGLE BLOG
export async function getSingleBlogService(id : string) {  

    const query = {_id : new ObjectId(id)}

    const blog = await collections.blogs?.findOne(query)

    return blog
}

//GET BLOGS BY TAG
export async function getBlogsByTagService(tag: string, page: number, limit:number) {
    const skip = (page - 1) * limit
    const query = { tags: { $regex: new RegExp(`${tag}`, 'iu')} }
    const blogs = await collections.blogs?.find(query)
        .skip(skip)
        .limit(limit)
        .toArray();
    const totalDocuments = await collections.blogs?.countDocuments(query);
    return {
        blogs: blogs || [],
        totalDocuments: totalDocuments || 0
    };
}
    
//CREATE SINGLE BLOG
export async function createBlogService(blog: Blog) {
    try {
        if (!blog.date) {
            blog.date = new Date();
        }

        const result = await collections.blogs?.insertOne(blog)
        if (result?.acknowledged) {
            return { success: true, insertedId: result.insertedId };
        } else {
            return { success: false };
        }

    } catch (err) {
        console.error(err)
        return {success : false}
    }
}

//UPDATE SINGLE BLOG
export async function updateBlogService(id : string, blog: any) {
    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections?.blogs?.updateOne(query, { $set: blog });
    
        if (result && result.matchedCount) {
            return { success: true }
        } else if (!result?.matchedCount) {
            return {success: false, msg : 'not_found'}
        } else {
            return {success: false, msg: "error"}
        }
    } catch (err) {
        console.error("Error in updateBlogService:", err);
        return {success: false}
    }
}

//POST SINGLE COMMENT ON BLOG (UPDATE BLOG)
export async function createCommentService(blogId: string, newComment: object) {
    try {
        const result = await collections?.blogs?.updateOne(
            {_id : new ObjectId(blogId)},
            {$push : {comments: newComment}}
        )
        if (result && result.matchedCount) {
            return {success : true}
        } else {
            return {success : false}
        }

    } catch (err) {
        console.error('something went wrong', err)
        return {success: false}

    }
}

//DELETE BLOG BY ID
export async function deleteBlogService(id: string) {
    const query = { _id: new ObjectId(id) };
    const result = await collections?.blogs?.deleteOne(query);
    
    if (result && result.deletedCount) {
        return {success : true}
    } else {
        return {success : false, msg : 'not_found'}
    }
}
