import * as express from "express"
import { ObjectId } from "mongodb"
import { collections } from "./database"

export const userRouter = express.Router()

userRouter.use(express.json())

userRouter.get("/", async (_req, res) => {
    try {
        const users = await collections?.users?.find({}).toArray()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error instanceof Error ? error.message : "Unknown error")
    }
})

userRouter.get("/:id", async (req, res) => {
    try{
        const id = req.params.id
        if (!ObjectId.isValid(id)){
            res.status(400).send("Invalid id")
            return
        }
        const query = {_id : new ObjectId(id)}
        const user = await collections.users?.findOne(query)
        if (user) {
            res.status(200).send(user)
        } else {
            res.status(404).send(`failed to find user with id ${id}`)
        }
    } catch {
        res.status(500).send(`Internal Server Error. Try again later.`)
    }
})
