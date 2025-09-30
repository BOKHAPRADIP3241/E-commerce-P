const Joi = require('joi');

const cartItemSchema = Joi.object({
    productId: Joi.string().required().label('productId'),
    quantity: Joi.number().integer().min(1).required().label('quantity')
});

const orderSchema = Joi.object({
    firstName: Joi.string().trim().min(1).required().label('firstName'),
    lastName: Joi.string().trim().min(1).required().label('lastName'),
    address: Joi.string().trim().min(1).required().label('address'),
    cart: Joi.array().items(cartItemSchema).min(1).required().label('cart')
});

module.exports = orderSchema;
