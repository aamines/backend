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
