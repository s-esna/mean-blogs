/**
 * This module defines the schema for the `blogs` collection in MongoDB using JSON Schema validation.
 * It ensures that documents inserted into the collection follow a defined structure and that only the specified fields are allowed.
 * 
 * The schema includes fields for `title`, `body`, `img`, `comments`, `tags`, and `date`, each with specific validation constraints.
 * Additionally, the schema defines the structure of comments associated with each blog post, including required fields like `username`
 * and `commentBody`.
 * 
 * Functions:
 * - `applyBlogSchema(db: mongodb.Db)`: Applies the blog schema to the `blogs` collection. If the collection does not exist,
 *   it creates the collection and applies the schema. This function also handles the error when the collection does not exist
 *   and ensures that the schema is applied correctly.
 */
import * as mongodb from "mongodb";

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


/**
 * Applies the blog schema to the `blogs` collection in the provided MongoDB database.
 * If the collection does not exist, it will create the collection and apply the schema.
 * This function also handles the error when the collection does not exist and ensures that
 * the schema is correctly applied to the collection.
 * 
 * @param {mongodb.Db} db - The MongoDB database instance to apply the schema to.
 * 
 * @returns {Promise<void>} - A promise that resolves when the schema is successfully applied.
 */
export async function applyBlogSchema(db: mongodb.Db) {

    //After experimenting with index creation, the below code was throwing errors, so I removed it for ease of use
    //left the commented in commands, for clarity and understanding of creation
    // Create indexes
    await db.collection('blogs').createIndex(
        { title: "text", body: "text" }, // Include both fields
        { name: "title_body_text", weights: { title: 2, body: 1 } } // Optionally set weights
    );
    await db.collection('blogs').createIndex({ tags: 1 }); // Index for tags

    await db.command({
        collMod: "blogs",
        validator: blogsSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("blogs", {validator: blogsSchema});
        }
    });
}