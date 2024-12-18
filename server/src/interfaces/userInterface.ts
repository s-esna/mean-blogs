/**
 * Interface representing a User.
 * 
 * A `User` object contains the necessary details about a user, including their username, email, password,
 * optional birth date components (day, month, year), and their administrative status.
 * This structure is designed to align with the MongoDB schema for users and supports optional fields for birth details.
 * 
 * Fields:
 * - `username`: The unique username of the user.
 * - `email`: The email address of the user, which is also unique.
 * - `password`: The user's password (in hashed form).
 * - `birthDay` (optional): The day of the user's birth (1-31).
 * - `birthMonth` (optional): The month of the user's birth (1-12).
 * - `birthYear` (optional): The year of the user's birth.
 * - `isAdmin`: A boolean flag indicating whether the user is an admin (true) or not (false).
 * - `_id` (optional): The unique identifier (ObjectId) for the user document in MongoDB.
 */

import mongodb from "mongodb";

export interface User {
    username: string,
    email: string
    password: string
    birthDay?: number,
    birthMonth?: number,
    birthYear?: number
    isAdmin: boolean
    _id?: mongodb.ObjectId
}
