/**
 * This module defines the schema for the `users` collection in MongoDB using JSON Schema validation.
 * It ensures that documents inserted into the collection meet the required structure, including the validation of 
 * certain fields like `username`, `email`, `password`, and `isAdmin`. The module also ensures that `email` and `username`
 * are unique across all users by creating indexes on these fields.
 * 
 * @import { mongodb }: The MongoDB package, used for defining and applying the schema to the database.
 * 
 * Functions:
 * - `applyUserSchema(db: mongodb.Db)`: Applies the user schema to the `users` collection and ensures the 
 *   uniqueness of `email` and `username` fields. It also validates documents based on the schema.
 */

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


/**
 * Applies the user schema to the `users` collection in the provided MongoDB database.
 * Ensures the collection is properly validated with the required fields and uniqueness constraints.
 * If the collection doesn't exist, it creates the collection and applies the schema.
 * 
 * @param {mongodb.Db} db - The MongoDB database instance to apply the schema to.
 * 
 * @returns {Promise<void>} - A promise that resolves when the schema is successfully applied.
 */
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
