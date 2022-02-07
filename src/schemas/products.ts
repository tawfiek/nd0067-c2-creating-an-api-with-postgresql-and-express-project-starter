import joi from 'joi';

export const addNewProductSchema = joi.object({
    name: joi.string().min(2).max(50).required(),
    price: joi.number().min(0).max(50000).required(),
});

