import joi from 'joi';


export const addNewUSerSchema = joi.object({
    firstName: joi.string().min(2).max(50).required(),
    lastName: joi.string().min(2).max(50).required(),
    password: joi.string().min(2).max(50).required(),
    username: joi.string().min(2).max(100).required(),
});
