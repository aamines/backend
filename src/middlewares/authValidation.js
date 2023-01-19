import Joi from 'joi';

//validating register user
export const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        names: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        country: Joi.string().min(3).required(),
        password: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
//validating login user
export const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
//validate forgot password
export const forgotPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),

    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
//validating reset password
export const resetPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required(),
        code: Joi.string().min(6).max(6).required()
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
//validating reset password
export const newPasswordValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        newPassword: Joi.string().min(6).required(),
        oldPassword: Joi.string().min(6).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
//validating update user
export const updateUserValidation = (req, res, next) => {
    const schema = Joi.object({
        names: Joi.string().min(6),
        country: Joi.string().min(6),
        email: Joi.string().min(6).email(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
//validating verify email
export const verifyEmailValidation = async(req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).email().required(),
        code: Joi.string().required().min(5)
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    next();
}
