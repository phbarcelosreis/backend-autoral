import { prisma } from "../../database/index";

export async function cartPost({ userId, cartProduct }) {
    const cartProducts = cartProduct.map(({ productId }) => {
        return { productId: Number(productId) }
    })

    let cart = await prisma.cart.findFirst({
        where: { userId },
        include: { cartProducts: true },
    })

    if (!cart) {
        cart = await prisma.cart.create({
            data: {
                userId: userId,
                cartProducts: {
                    create: cartProducts,
                },
            },
            include: { cartProducts: { include: { product: true } } },
        })
    } else {
        for (let i = 0; i < cartProducts.length; i++) {
            const { productId } = cartProducts[i]
            if (!cart.cartProducts.some((cp) => cp.productId === productId)) {
                await prisma.cartProduct.create({
                    data: {
                        productId,
                        cartId: cart.id,
                    },
                })
            }
        }
    }

    return
}

export async function postPaymentId({userId}) {
  await prisma.payment.create({
    data: {
      userId
    }
  })

  return {
    message: "Payment check!"
  }
}

export async function cleanCart({userId}) {
  const cartId = await prisma.cart.findFirst({
    where: {
      userId
    }
  });
  await prisma.cartProduct.deleteMany({
    where: {
      cartId: cartId.id
    }
  });
  await prisma.cart.deleteMany({
    where:{
      userId: Number(userId)
  }});
  return {
    message: "Cart Clean"
  }
}

export async function cartGet({ userId }) {
    const cart = await prisma.cart.findFirst({
      where: {
        userId,
      },
      include: {
        cartProducts: {
          include: {
            product: {
              select: {
                name: true,
                price: true,
                description: true,
                image: true
              },
            },
          },
        },
      },
    });
    return cart;
}

export async function findCartByUserId({userId}) {

    const cart = await prisma.cart.findFirst({
        where: {
            userId: userId
        }
    })

    return cart;
}

export async function cartGetProduct(id: number) {
    const cart = await prisma.cartProduct.findMany({
        where: {
            cartId: id
        }
    })

    console.log(cart)

    return cart;
}
  
