export interface IUser {
    _id: string,
    username: string,
    email: string
    password: string
    verifyPassword: string
    birthDay: number,
    birthMonth: number,
    birthYear: number
}

export interface IBlog {
    //ENSURE THAT INTERFACE OF BACKEND MATCHES INTERFACE OF FRONTEND. THE NAMING MUST MATCH! OTHERWISE IT DOESNT WORK
    date: Date,
    title: string
    body: string
    img: string ,
    tags?: string[],
    comments?: {
        username: string,
        date: Date,
        commentBody: string,
    }[],
    _id: string,
}
