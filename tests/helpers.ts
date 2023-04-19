import dotenv from "dotenv"
import { createUser } from "./factories/user-factory";
import { prisma } from "../src/database/index";
import { User } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import { createSession } from "./factories/session-factory";


dotenv.config();

export async function cleanDb() {

    await prisma.session.deleteMany({});
    await prisma.cartProduct.deleteMany({});
    await prisma.cart.deleteMany({});
    await prisma.user.deleteMany({});

}

export async function generateValidToken(user?: User) {

    const incomingUser = user || (await createUser());
    const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

    await createSession(token);

    return token;
    
}