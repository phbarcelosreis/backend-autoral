import { prisma } from "../../database/index";

export async function insertProduct({ name, price, description, image }) {

    const product = await prisma.products.create({
        data: {
            name,
            price,
            description,
            image
        },
    });

    return product.id

}

export async function getProduct() {

    const product = await prisma.products.findMany();

    return product;

}

export async function getProductsById({ productId }) {

    const product = await prisma.products.findFirst({
        where: {
            id: Number(productId)
        }
    });

    return product;

}

export async function deleteProductById({productId}) {

    try {

        await prisma.products.delete({
            where: {
                id: Number(productId)
            }
        })

    } catch(err) {
        return err
    }
   
    return {
        message: "OK"
    }

}