import { ObjectId } from "mongodb";
import { collections } from "../config/database";
import { Blog } from "../interfaces/blogInterface";


//GET ALL
export async function getAllBlogsService ()  {
// export async function getAllBlogsService (paginationParameters : {limit: number, page: number})  {
    // const {limit, page} = paginationParameters
    try{
        // const paginatedResults = collections?.blogs
        //                         ?.find({})
        //                         .skip((page-1) * limit)
        //                         .limit(limit)
        // const blogs = await paginatedResults?.toArray()
        // const totalBlogs = await collections?.blogs?.countDocuments()
        // const totalPages = Math.ceil((totalBlogs || 0) / limit)
        // return {blogs, totalBlogs, totalPages, page}
        return await collections?.blogs?.find({}).toArray()
    } catch (err) {
        console.error('error while fetching blogs', err)
    }
}

//GET SINGLE BLOG
export async function getSingleBlogService(id : string) {  

    const query = {_id : new ObjectId(id)}

    const blog = await collections.blogs?.findOne(query)

    return blog
}

//GET BLOGS BY TAG
export async function getBlogsByTagService(tag: string) {

    const query = { tags: { $regex: new RegExp(tag, 'i') } } //Case insensitive
    return await collections.blogs?.find(query).toArray()
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
            return {success: false, msg : 'no_change'}
        } else {
            return {success: false, msg: "not_found"}
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

export async function getUsernameByUserId(userId : string) {
    try {
        const user = await collections?.users?.findOne(
            { _id: new ObjectId(userId) },
            { projection: { username: 1 } } // Retrieve only the username field
        );

        return user?.username
    } catch (err) {
        console.error('could not fetch user', err)
        throw new Error('Error while looking for user in DB')
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
