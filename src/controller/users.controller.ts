import { Request, Response } from "express";
import httpStatus from "http-status";
import { registerNewUser, userLogin } from "../services/users-service/index";

async function registerUser(req: Request, res: Response) {

    const { name, email, password } = req.body

    try{
        const user = await registerNewUser({ name, email, password });

        return res.status(httpStatus.CREATED).send(user);

    } catch(err) {
        return res.status(httpStatus.BAD_REQUEST).send(err);

    }

}

async function loginUser(req: Request, res: Response) {

    const { email, password } = req.body

    try{
        const token = await userLogin({ email, password });

        return res.status(httpStatus.OK).send(token);

    } catch(err) {
        if(err.name === "UserNotFound") {
            return res.status(httpStatus.BAD_REQUEST).send(err);
        }

        return res.status(httpStatus.BAD_REQUEST).send(err);
    }

}

export {
    registerUser,
    loginUser
}