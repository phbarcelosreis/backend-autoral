import { Request, Response } from "express";
import httpStatus, { NOT_FOUND } from "http-status";
import { checkProductId, delProduct, postProduct } from "../services/products-service/index";
import { getProduct } from "../repositories/products-repositories/index";


async function createProduct(req: Request, res: Response) {
  const { name, price, description, image } = req.body;

  try {

    const product = await postProduct({name, price, description, image});

    return res.status(httpStatus.OK).send(product);


  } catch (err) {
    return res.send(err)
  }
}

async function getProducts(req: Request, res: Response) {

  try {

    const product = await getProduct();

    return res.status(httpStatus.OK).send(product);

  } catch (err) {

    return res.send(err);

  }
}

async function getProductById(req: Request, res: Response) {

  const { productId } = req.params;

  try {

    const product = await checkProductId({productId});

    return res.status(httpStatus.OK).send(product);

  } catch (err) {

    if(err.name === "notFoundError") {
      return res.status(NOT_FOUND).send(err);
    }

  }
}

async function deleteProduct(req: Request, res: Response) {
  const { productId } = req.params;

  try{

    await delProduct({ productId });

    return res.sendStatus(httpStatus.OK);

  } catch(err) {

    if(err.name === "notFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(err);
    }

    return res.status(httpStatus.UNAUTHORIZED).send(err);

  }

}

export {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct
}
