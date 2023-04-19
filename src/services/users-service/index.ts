import { createSession, findUserByEmail, postUser } from "../../repositories/users-repositories/index";
import { loginSchema, registerSchema } from "../../schemas/schemas";
import { userAlreadyExist, userNotFound } from "./error";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

async function registerNewUser({ name, email, password }) {

    const obj = {
        name,
        email,
        password
    }

    const validation = registerSchema.validate(obj);

    const newPassword = await bcrypt.hash(password.toString(), 12);

    console.log(newPassword)

    if(validation.error) {
        const errors = validation.error.details.map((detail: { message: string; }) => detail.message);
        throw errors;
    }

    const checkEmail = await findUserByEmail({email});

    if(checkEmail) {
        throw userAlreadyExist();
    }

    const user = await postUser({ name, email, newPassword });

    return {
        userId: user.id
    }

}

async function userLogin({ email, password }) {

    const obj = {
        email,
        password
    }

    const validation = loginSchema.validate(obj);

    if(validation.error) {
        const errors = validation.error.details.map((detail: { message: string; }) => detail.message);
        throw errors;
    }

    const checkEmail = await findUserByEmail({email});

    if(!checkEmail) {
        throw userNotFound();
    }

    const token = jwt.sign({ userId: checkEmail.id }, process.env.JWT_SECRET);

    await createSession({userId: checkEmail.id, token})

    return {
        userId: checkEmail.id,
        userEmail: checkEmail.email,
        userName: checkEmail.name,
        token
    }

}

export {
    registerNewUser,
    userLogin
}