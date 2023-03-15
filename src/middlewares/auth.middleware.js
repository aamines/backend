const Joi = require("joi");

//validating register user
module.exports.registerValidation = (req, res, next) => {
  const schema = Joi.object({
    names: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(10).max(60).email().required(),
    country: Joi.string().min(2).max(40).required(),
    password: Joi.string().min(8).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

//validating login user
module.exports.loginValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(10).max(60).email().required(),
    password: Joi.string().min(8).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

//validate forgot password
module.exports.forgotPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(10).max(60).required().email(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

//validating reset password
module.exports.resetPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(60).required().email(),
    password: Joi.string().min(8).max(15).required(),
    code: Joi.string().min(6).max(6).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

//validating reset password
module.exports.newPasswordValidation = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(60).required().email(),
    newPassword: Joi.string().min(8).max(15).required(),
    oldPassword: Joi.string().min(8).max(15).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

//validating update user
module.exports.updateUserValidation = (req, res, next) => {
  const schema = Joi.object({
    names: Joi.string().min(5).max(50),
    country: Joi.string().min(2).max(15),
    email: Joi.string().min(10).max(60).email(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};

//validating verify email
module.exports.verifyEmailValidation = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().min(6).max(60).email().required(),
    code: Joi.string().required().min(40).max(40),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};
