import * as mongodb from "mongodb";



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

export interface Blog {
    date: Date,
    title: string
    body: string
    img?: string,
    tags?: string[],
    comments?: {
        username: string,
        date: Date,
        commentBody: string,
    }[],
    _id?: mongodb.ObjectId
}

