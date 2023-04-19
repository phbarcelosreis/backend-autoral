import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts } from "../controller/product.controller";

const productRouter = Router();

productRouter.post("/addProduct", createProduct)
             .get("/getProducts", getProducts)
             .get("/getProduct/:productId", getProductById)
             .delete("/deleteProduct/:productId", deleteProduct)
;

export { productRouter };
