import { ObjectId } from "mongodb";
import { collections } from "../config/database";
import { Blog } from "../interfaces/blogInterface";

export async function getAllUsersService() {
    return await collections.users?.find({}).toArray()
}