import { Request, Response } from "express";
import httpStatus from "http-status";
import { getCart, paymentPost, postCart } from "../services/cart-service/index";
import { AuthenticatedRequest } from "../middleware/authenticated-middleware";

async function cartPost(req: AuthenticatedRequest, res: Response) {

    const { userId } = req;

    const { cartProduct } = req.body

    try {
        console.log(userId)

        const cart = await postCart({ userId, cartProduct});

        return res.status(httpStatus.OK).send(cart);

    } catch(err) {

        if(err.name === "CartAlreadyExists") {
            return res.status(httpStatus.UNAUTHORIZED).send(err)
        }

        return res.status(httpStatus.BAD_REQUEST).send(err);
    }

}

async function cartGet(req: AuthenticatedRequest, res: Response) {

    const { userId } = req;

    try {

        const cart = await getCart({ userId });

        return res.status(httpStatus.OK).send(cart);

    } catch(err) {

        return res.status(httpStatus.BAD_REQUEST).send(err);
    }

}

async function postPayment(req: AuthenticatedRequest, res: Response) {

    const { userId } = req;
    const { cardData } = req.body;

    try {

        await paymentPost({cardData: cardData,  userId });

        return res.sendStatus(httpStatus.OK);

    } catch(err) {

        return res.status(httpStatus.BAD_REQUEST).send(err);
    }

}



export {
    cartPost,
    cartGet,
    postPayment
}