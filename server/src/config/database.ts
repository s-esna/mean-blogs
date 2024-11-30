import * as mongodb from "mongodb";
import { Blog } from "../interfaces/blogInterface";
import { User } from "../interfaces/userInterface";
import { applyUserSchema } from "../models/userModel";
import { applyBlogSchema } from "../models/blogModel";


export const collections: {
    users?: mongodb.Collection<User>;
    blogs?: mongodb.Collection<Blog>; // Another collection for posts
} = {}

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
}