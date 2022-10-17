import joi from 'joi';

const signUpSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().required(),
    password: joi.string().trim().min(8).required(),
    confirmPassword: joi.string().required().valid(joi.ref('password'))
});

const signInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export { signUpSchema, signInSchema };