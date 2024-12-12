import * as express from "express"
import { authenticateToken} from "../middleware/authMiddleware"
import { limiter } from "../middleware/limiter"
import { getAllUsersController, getUsernameByUserIdController, loginUserController, registerUserController } from "../controllers/userController"
import { checkAdmin } from "../middleware/isAdmin"

export const userRouter = express.Router()

//GET ALL USERS
userRouter.get("/", authenticateToken, checkAdmin, getAllUsersController)

//POST USER (REGISTER)
userRouter.post('/register', registerUserController);

//POST USER (LOGIN)
userRouter.post('/login', limiter, loginUserController);

//GET USERNAME BY USERID
userRouter.get("/username", authenticateToken, getUsernameByUserIdController)