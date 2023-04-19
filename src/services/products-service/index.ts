import notFoundError from "../../error/notFoundError"
import { deleteProductById, getProductsById, insertProduct } from "../../repositories/products-repositories/index";
import { productSchema } from "../../schemas/schemas";

async function postProduct({name, price, description, image}) {

    const obj = {
        name,
        price,
        description,
        image
    }

    const validation = productSchema.validate(obj);
    
    if(validation.error) {
        const errors = validation.error.details.map((detail: { message: string; }) => detail.message);
        throw errors;
    }

    const product = await insertProduct({ name, price, description, image });

    return { productId: product };

}

async function checkProductId({productId}) {

    const checkProduct = await getProductsById({productId});

    if(!checkProduct) {
        throw notFoundError();
    }

    return checkProduct;

}

async function delProduct({productId}) {

    const deleteProduct = await deleteProductById({productId});

    if(deleteProduct.message !== "OK") {
        throw notFoundError();
    }

    return 

}

export {
    checkProductId,
    postProduct,
    delProduct
}