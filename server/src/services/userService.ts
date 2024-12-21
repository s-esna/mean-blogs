import { collections } from "../config/database";
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_SECRET_KEY } from "../config/env";
import { ObjectId } from "mongodb";



//GET ALL USERS PAGINATED
export async function getAllUsersService(page : number, limit: number) {
    const skip = (page - 1) * limit
    const users = await collections.users?.find({})      //Could omit passwords here, but they are encrypted anyway
        .skip(skip)
        .limit(limit)
        .toArray()
    const total = await collections.users?.countDocuments()

    return {
        users: users || [],
        total: total || 0
    }
}

//POST USER (REGISTER)
export async function registerUserService(user: any): Promise<{ success: boolean; status: number; message: string }> {
    try {
        // Set default admin status
        user.isAdmin = false;

        // Check for duplicate email or username
        const existingUser = await collections.users?.findOne({
            $or: [{ username: user.username }, { email: user.email }],
        });

        if (existingUser) {
            if (existingUser.username === user.username) {
                return { success: false, status: 400, message: 'Username exists' };
            } else if (existingUser.email === user.email) {
                return { success: false, status: 400, message: 'Email exists' };
            }
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        user.password = hashedPassword;

        // Insert user into the database
        const result = await collections.users?.insertOne(user);
        if (result?.acknowledged) {
            return {
                success: true,
                status: 201,
                message: `Inserted user successfully with ID ${result.insertedId}`,
            };
        } else {
            return { success: false, status: 500, message: 'Failed to create user' };
        }
    } catch (error) {
        console.error('Error in registerUserService:', error);
        return { success: false, status: 500, message: 'Something went wrong. Please try again later, and make sure you insert a valid email, username and password' };
    }
}

//POST USER (LOGIN)
export async function loginUserService(loginAttempt: {emailOrUsername: string; password: string;}) : Promise<{
    success: boolean;
    status: number;
    message: string;
    token?: string;
    loggedUser?: any;
}> {
    try {
        if (!JWT_SECRET_KEY) {
            console.error("there is no secret key for JWT, careful on server launch path")
            process.exit(1)
        }
        
        const { emailOrUsername, password } = loginAttempt;

        // Step 0: Validate input
        if (!emailOrUsername || !password) {
            return { success: false, status: 400, message: 'Please provide both username/email and password' };
        }

        // Step 1: Check if username/email exists
        const existingUser = await collections.users?.findOne({
            $or: [
                { username: emailOrUsername },
                { email: emailOrUsername }
            ],
        });

        if (!existingUser) {
            return { success: false, status: 404, message: 'No such username or email exists' };
        }

        // Step 2: Verify password
        const match = await bcrypt.compare(password, existingUser.password);
        if (!match) {
            return { success: false, status: 401, message: 'Wrong password' };
        }

        // Step 2.5: Construct birthday (for fun)
        const birthday = `${String(existingUser.birthDay).padStart(2, '0')}-${String(existingUser.birthMonth).padStart(2, '0')}-${existingUser.birthYear}`; 

        // Step 3: Generate JWT
        const token = jwt.sign(
            { id: existingUser._id, isAdmin: existingUser.isAdmin },
            JWT_SECRET_KEY,
            { expiresIn: '7d' }
        );

        // Step 4: Return success with token and user data
        return {
            success: true,
            status: 200,
            message: 'Login Successful',
            token,
            loggedUser: {
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin,
                birthday,
            },
        };
    } catch (err) {
        console.error('Error in loginUserService:', err);
        return { success: false, status: 500, message: 'Server error. Please try again later.' };
    }
}

//GET USERNAME BY USERID
export async function getUsernameByUserIdService(userId : string) {
    try {
        const user = await collections?.users?.findOne(
            { _id: new ObjectId(userId) },
            { projection: { username: 1 } } // Retrieve only the username field
        );

        return user?.username
    } catch (err) {
        console.error('could not fetch user', err)
        throw new Error('Error while looking for user in DB')
    }
}

//GET ALL EMAILS
export async function getAllEmailsService() {
    try{
        return await collections?.users?.find({}, { projection: { email: 1 } }).toArray();
    } catch (err) {
        console.error('could not fetch emails', err)
        throw new Error('Error while fetching emails from DB')
    }
}
