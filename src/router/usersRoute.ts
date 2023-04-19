import { loginUser, registerUser } from "../controller/users.controller";
import { Router } from "express";

const usersRouter = Router();

usersRouter.post("/registerUser", registerUser)
           .post("/logIn", loginUser)

export { usersRouter }