const joi = require("joi");
const jwt = require("jsonwebtoken");

module.exports.generateRandomAlphaNumericCode = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i <= 5; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    code += chars.substring(randomNumber, randomNumber + 1);
  }
  return code;
};

//generate access token
module.exports.generateToken = async (user) => {
  const payload = {
    id: user.id,
  };
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

//verify user signup payload
module.exports.verifyUserSignupPayload = async (payload) => {
  const schema = joi.object({
    names: joi.string().min(5).max(50).required(),
    email: joi.string().min(10).max(60).email().required(),
    country: joi.string().min(2).max(15).required(),
    password: joi.string().min(8).max(15).required(),
  });
  return schema.validate(payload);
};

//verify user login payload
module.exports.verifyUserLoginPayload = async (payload) => {
  const schema = joi.object({
    email: joi.string().min(10).max(60).email().required(),
    password: joi.string().min(8).max(15).required(),
  });
  return schema.validate(payload);
};
