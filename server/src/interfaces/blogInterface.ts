/**
 * Interface representing a Blog post.
 * 
 * A `Blog` object contains details of a blog post including the title, body, optional image, tags, and comments.
 * This structure is designed to align with the MongoDB schema for blogs and supports various optional fields
 * such as comments and tags to enhance the blog post's content and functionality.
 * 
 * Fields:
 * - `date`: The date the blog post was created or published.
 * - `title`: The title of the blog post.
 * - `body`: The content/body of the blog post.
 * - `img` (optional): An optional image URL associated with the blog post.
 * - `tags` (optional): An optional array of strings representing tags associated with the blog post.
 * - `comments` (optional): An optional array of comment objects. Each comment contains:
 *     - `username`: The username of the person who posted the comment.
 *     - `date`: The date the comment was posted.
 *     - `commentBody`: The content of the comment.
 * - `_id` (optional): The unique identifier (ObjectId) for the blog post in MongoDB.
 */

import mongodb from "mongodb";

export interface Blog {
    date: Date,
    title: string
    body: string
    img?: string,
    tags?: string[],
    comments?: {
        username: string,
        date: Date,
        commentBody: string,
    }[],
    _id?: mongodb.ObjectId
}