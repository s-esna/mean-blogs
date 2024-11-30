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

export async function applyBlogSchema(db: mongodb.Db) {

    //After experimenting with index creation, the below code was throwing errors, so I removed it for ease of use
    //left the commented in commands, for clarity and understanding of creation

    // await db.collection('blogs').createIndex({ title: 1 });
    // await db.collection('blogs').createIndex({ body: "text" }); // Full-text search for body
    // await db.collection('blogs').createIndex({ tags: 1 });

    await db.command({
        collMod: "blogs",
        validator: blogsSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("blogs", {validator: blogsSchema});
        }
    });
}