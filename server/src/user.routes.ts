import * as express from "express"
import { ObjectId } from "mongodb"
import { collections } from "./database"
import * as bcrypt from 'bcrypt'
import * as rateLimiter from 'express-rate-limit'
import jwt from 'jsonwebtoken'
import * as dotenv from "dotenv"
import { authenticateToken, CustomRequest } from "./middleware/authMiddleware"

export const userRouter = express.Router()

//Limiter definition, for allowing a maximum of 15 login attempts per 15 minutes. Used on the login endpoint
const limiter = rateLimiter.rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 15, 
	standardHeaders: 'draft-7',
	message: "You tried too many times to Login. Try again later (<=15 mins)"
})

//Secret key 
dotenv.config()
const SECRET_KEY = process.env.SECRET_KEY_JWT
if (!SECRET_KEY) {
    console.error("there is no secret key for JWT, careful on server launch path")
    process.exit(1)
}

userRouter.use(express.json())

userRouter.get("/", authenticateToken, async (_req, res) => {
    try {
        const users = await collections?.users?.find({}).toArray()
        res.status(200).send(users)
    } catch (error) {
        res.status(500).json({message : error instanceof Error ? error.message : "Unknown error"})
    }
})


userRouter.post("/register", async (req, res) => {

    try{
        const user = req.body
        user.isAdmin = false

        //Email and Username checking for duplicates
        const existingUser = await collections.users?.findOne({
            $or: [
                {username : user.username},
                {email: user.email}
            ]
        })

        if (existingUser) {
            if (existingUser.username === user.username) {
                res.status(400).json({ message: "Username exists" });
            } else if (existingUser.email === user.email) {
                res.status(400).json({ message: "Email exists" });
            }
            console.log("Duplicate entry found");
            return;
        }
        //Password Hashing 
        const saltRounds = 10
        const hashedPassword = await bcrypt.hash(user.password, saltRounds)
        //Replace password with hashedPassword
        user.password = hashedPassword
        console.log('trying to add user: ', user)

        const result = await collections.users?.insertOne(user)
        if (result?.acknowledged) {
            res.status(201).json({message : "inserted user successfully with id " + result.insertedId})
        } else {
            res.status(500).json({message : 'failed to create user'})
        }
    } catch (error) {
        console.error(error)
        res.status(400).json({message : (error instanceof Error ? error.message : 'something went wrong')})
    }
})



userRouter.post("/login", limiter, async (req, res) => {
    try{
        const loginAttempt = req.body

        //step 0, make sure both fields have been entered by user
        if (!loginAttempt.emailOrUsername || !loginAttempt.password) {
            res.status(400).json({ message: 'Please provide both username/email and password' });
            return 
        }
        
        //1st step of login, check if username or email exists
        const existingUser = await collections.users?.findOne({
            $or: [
                {username : loginAttempt.emailOrUsername},
                {email: loginAttempt.emailOrUsername}
            ]
        })

        if (!existingUser) {
            res.status(404).json({ message: 'No such username or email exists' })
            return
        }

        //2nd step (if 1st step success), check for password match
        const match = await bcrypt.compare(loginAttempt.password, existingUser.password);
        if (!match){
            res.status(401).json({message: 'wrong password'})
            return
        }
        //2.5 step, for fun
        const birthday = `${String(existingUser.birthDay).padStart(2, '0')}-${String(existingUser.birthMonth).padStart(2, '0')}-${existingUser.birthYear}`; 

        //3rd step, everything matches if we got this far, time to issue a JWT
        
        const token = jwt.sign(
            { id: existingUser._id, isAdmin: existingUser.isAdmin }, 
            SECRET_KEY, 
            { expiresIn: '7d' } 
        );


        //4th step, everything matches, proceed to login, with token
        res.status(200).json({
            message: 'Login Successful',
            token,
            loggedUser: {
                id: existingUser._id, 
                username: existingUser.username, 
                email: existingUser.email, 
                isAdmin: existingUser.isAdmin,
                birthday: birthday
            }
        })

    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'An unexpected error occured'})
        return
    }
})

userRouter.get("/test", authenticateToken,  (req: CustomRequest, res) => {
    res.json({
        message: "JWT validated successfully!",
        user: req.user, // This is the `user` you attached in the middleware
    });
});
