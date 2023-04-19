import { checkToken } from "../middleware/authenticated-middleware";
import { cartPost, cartGet, postPayment } from "../controller/carts.controller";
import { Router } from "express";

const cartsRouter = Router();

cartsRouter.post("/cart", checkToken, cartPost)
           .get("/cart", checkToken, cartGet)
           .post("/payments", checkToken, postPayment)


export { cartsRouter }