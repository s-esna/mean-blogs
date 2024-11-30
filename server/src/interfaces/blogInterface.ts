import mongodb from "mongodb";

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