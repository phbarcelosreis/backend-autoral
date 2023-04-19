import { userNotFound } from "../../services/users-service/error";
import { findUserById } from "../../repositories/users-repositories/index";
import { cartSchema } from "../../schemas/schemas";
import { cartGet, postPaymentId, cartPost, findCartByUserId, cleanCart } from "../../repositories/carts-repositories/index";
import { cartAlreadyExists } from "./error";
import { postPayment } from "controller/carts.controller";

async function postCart({ userId, cartProduct }) {

    const validation = cartSchema.validate({
        cartProduct
    })

    if(validation.error) {
        const errors = validation.error.details.map((detail: { message: string; }) => detail.message);
        throw errors;
    }

    const checkUser = await findUserById({ userId });

    if(!checkUser) {
        throw userNotFound();
    }

    await cartPost({ userId, cartProduct });

    return {
        message: "Cart created successfully"
    }

}

async function getCart({ userId }) {

    const checkUser = await findUserById({ userId });

    if(!checkUser) {
        throw userNotFound();
    }

    const cart = await cartGet({userId});
    console.log(cart);

    return cart

}

async function paymentPost({ cardData: cardData, userId }) {
    console.log(cardData)

    if(!cardData ) { 
        throw {
            message: "Envie um cartão válido!"
        }
    }

    const checkUser = await findUserById({ userId });

    if(!checkUser) {
        throw userNotFound();
    }

    const payment = await postPaymentId({userId}) 

    if(payment.message === "Payment check!") {
        await cleanCart({userId})
    }

    return {
        message: "Payment check!"
    }

}

export {
    postCart,
    getCart,
    paymentPost
}