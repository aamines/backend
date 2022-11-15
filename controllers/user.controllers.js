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
    checkSignup(data)
      .then((_) => {
        checkUser(data.email)
          .then((_) => {
            createUser(data)
              .then((user) => {
                createAccount(user)
                  .then(({ token, _ }) => {
                    return res.status(200).json({
                      status: "success",
                      message: "Account created",
                      token: token,
                    });
                  })
                  .catch((error) => {
                    return res.status(400).json({
                      status: "error",
                      message: error,
                    });
                  });
              })
              .catch((error) => {
                return res.status(400).json({
                  status: "error",
                  message: error,
                });
              });
          })
          .catch((error) => {
            return res.status(400).json({
              status: "error",
              message: error,
            });
          });
      })
      .catch((error) => {
        return res.status(400).json({
          status: "error",
          message: error,
        });
      });
  }
};
