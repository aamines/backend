//services
import {
  checkSignup,
  checkUser,
  createAccount,
  createUser,
} from "../services/user.service.js";

export const signup = (req, res) => {
  const data = {
    names: req.body.names,
    email: req.body.email,
    country: req.body.country,
    password: req.body.password,
    usedGoogle: req.body.usedGoogle,
  };

  if (!data.usedGoogle) {
    try {
      checkSignup(data).then((_) => {
        checkUser(data.email).then((found) => {
          if (!found) {
            createUser(data).then((user) => {
              createAccount(user).then(({ token, account }) => {
                return res.status(200).json({
                  status: "success",
                  message: "user and account created",
                  token: token,
                });
              });
            });
          } else {
            return res.status(400).json({
              message: "Email already used",
            });
          }
        });
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
};
