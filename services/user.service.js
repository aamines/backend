import joi from "joi";

//check signup data
export const checkSignup = async (data) => {
  await signupSchema
    .validateAsync(data)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error.message);
    });
};

const signupSchema = joi.object({
  names: joi.string().min(3).max(30).required(),
  email: joi.string().email().required(),
  country: joi.string().min(3).max(30).required(),
  password: joi.string().min(8).max(30).required(),
  usedGoogle: joi.boolean().required(),
});
