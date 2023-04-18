const Joi = require("joi");

//validating creating new community
module.exports.newCommunityValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(25).required(),
    vision: Joi.string().min(40).max(200).required(),
    type: Joi.string().min(5).max(20).email().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
    });
  }
  next();
};
