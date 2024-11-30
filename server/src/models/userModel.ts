import * as mongodb from "mongodb";
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

export async function applyUserSchema(db: mongodb.Db) {
    //Uniqueness of emails and usernames. Last line of defense
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ username: 1 }, { unique: true});

    await db.command({
        collMod: "users",
        validator: userSchema
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("users", {validator: userSchema});
        }
    });
}
