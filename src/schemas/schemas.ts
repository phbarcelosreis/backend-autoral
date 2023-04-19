import Joi from "joi";

export const productSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().min(2).required(),
    description: Joi.string().min(2).required(),
    image: Joi.string().min(2).required()
})

export const registerSchema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().min(2).email().required(),
    password: Joi.string().min(2).required()
})

export const loginSchema = Joi.object({
    email: Joi.string().min(2).required(),
    password: Joi.number().min(2).required()
})

const cartProductSchema = Joi.object({
  productId: Joi.number().integer().min(1).required(),
});

export const cartSchema = Joi.object({
  cartProduct: Joi.array().items(cartProductSchema).required(),
});


