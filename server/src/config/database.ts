/**
 * Handles the connection to the MongoDB database and initializes the necessary collections.
 * This module manages database connections, ensures the application schema is applied, 
 * and provides access to the collections used throughout the application.
 * 
 * @import mongodb: MongoDB driver to interact with the MongoDB database. Used to create the collections and the MongoClient.
 * @import Blog, User: Interfaces for blogs and users.
 * @import applyUserSchema, applyBlogSchema: Functions to apply the necessary schemas to the collections 
 *                                          in the MongoDB database.
 * 
 * @export collections: The MongoDB collections for users and blogs.
 *                     
 * @export connectToDatabase: Establishes a connection to the MongoDB database
 */


import * as mongodb from "mongodb";
import { Blog } from "../interfaces/blogInterface";
import { User } from "../interfaces/userInterface";
import { applyUserSchema } from "../models/userModel";
import { applyBlogSchema } from "../models/blogModel";

/**
 * Collections are populated once the database connection is established.
 */
export const collections: {
    users?: mongodb.Collection<User>;
    blogs?: mongodb.Collection<Blog>; 
} = {}

/**
 * Establishes a connection to the MongoDB database, applies the necessary schemas, 
 * and sets up the collections for users and blogs.
 * @param url - The connection string
 */
export async function connectToDatabase(url: string) {
    const client = new mongodb.MongoClient(url);
    await client.connect();

    const db = client.db("Pesek");
    await applyUserSchema(db);
    await applyBlogSchema(db)

    const usersCollection = db.collection<User>("users");
    collections.users = usersCollection;

    const blogsCollection = db.collection<Blog>("blogs");
    collections.blogs = blogsCollection;

    return client
}