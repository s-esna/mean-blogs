import * as mongodb from "mongodb";
import { Blog, User } from "./interfaces";

export const collections: {
    users?: mongodb.Collection<User>;
    blogs?: mongodb.Collection<Blog>; // Another collection for posts
} = {}

export async function connectToDatabase(url: string) {
    const client = new mongodb.MongoClient(url);
    await client.connect();

    const db = client.db("Pesek");
    await applySchemaValidation(db);

    const usersCollection = db.collection<User>("users");
    collections.users = usersCollection;

    const blogsCollection = db.collection<Blog>("blogs");
    collections.blogs = blogsCollection;


}

async function applySchemaValidation(db: mongodb.Db) {
    const userSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "email", "password", "isAdmin"],
            additionalProperties: false,
            properties: {
                _id: {},
                username: {
                    bsonType: "string",
                    description: "'username' is required and is a string",
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string",
                },
                password: {
                    bsonType: "string",
                    description: "'password' is required and is a string",
                },
                birthDay: {
                    bsonType: "number",
                    description: "'birthDay' is NOT required and is a number 01 - 31",
                },
                birthMonth: {
                    bsonType: "number",
                    description: "'birthMonth' is NOT required and is a number 01 - 31"
                },
                birthYear: {
                    bsonType: "number",
                    description: "'birthYear' is NOT required and is a number 01 - 31"
                },
                isAdmin: {
                    bsonType: "bool",
                    description: "isAdmin is required and set to false by default"
                }
            },
        },
    };

    //Uniqueness of emails and usernames. Last line of defense
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true });

    const blogsSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["title", "body",],
            additionalProperties: false,
            properties: {
                _id: {},
                title: { bsonType: "string", description: "Title of Blog" },
                body: { bsonType: "string", description: "Body of Blog"  },
                img: { bsonType: "string", description: "An image for the blog"  } ,
                comments: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["username",  "commentBody"],
                        properties: {
                            username: { bsonType: "string", description: "username of commenter" },
                            date: { bsonType: "date", description: "Date of comment posted" },
                            commentBody: { bsonType: "string", description: "Body of comment" },
                        }
                    },
                    description: "Comments of the blog"
                },
                tags: { 
                    bsonType: "array", 
                    items: { bsonType: "string" },
                    description: "tags for the blog"  
                } ,
                date: { bsonType: "date", description: "Date posted"  } 
                
            },
        },
    };



    await db.command({
        collMod: "users",
        validator: userSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users", {validator: userSchema});
        }
    });

    await db.command({
        collMod: "blogs",
        validator: blogsSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("blogs", {validator: blogsSchema});
        }
    });


}