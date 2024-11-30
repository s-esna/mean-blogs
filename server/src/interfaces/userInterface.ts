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
