import { prisma } from "../../database/index";

export async function postUser({ name, email, newPassword }) {

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: newPassword.toString()
        }
    })

    return user
}

export async function findUserByEmail({ email }) {

    const user = prisma.user.findFirst({
        where: {
            email
        }
    })

    return user

}

export async function findUserById({ userId }) {

    const user = prisma.user.findFirst({
        where: {
            id: Number(userId)
        }
    })

    return user

}

export async function createSession({userId, token}) {

    const user = await prisma.session.create({
        data: {
            userId: Number(userId),
            token
        },

    })

    return user

}

