import joi from 'joi';

export const addNewOrderSchema = joi.array().items(joi.object({
    productID: joi.number().required(),
    quantity: joi.number().min(1).max(100).required()
}));