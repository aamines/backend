//services
import {
  checkSignup,
  checkUser,
  comparePasswords,
  createUser,
  signin,
} from "../services/user.service.js";

import { createAccount, deleteAccounts } from "../services/account.service.js";

export const signup = async (req, res) => {
  const data = {
    names: req.body.names,
    email: req.body.email,
    country: req.body.country,
    password: req.body.password,
    usedGoogle: req.body.usedGoogle,
  };

  if (!data.usedGoogle) {
    await checkSignup(data)
      .then(async (_) => {
        await checkUser(data.email).then(async ({ found, _ }) => {
          if (!found) {
            await createUser(data)
              .then(async (user) => {
                await createAccount(user)
                  .then(async (account) => {
                    await signin(account).then((token) => {
                      return res.status(200).json({
                        status: "success",
                        message: "Account created",
                        token: token,
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
          } else {
            return res.status(400).json({
              status: "error",
              message: "Email already used",
            });
          }
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

export const login = async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
    usedGoogle: req.body.usedGoogle,
  };

  if (!data.usedGoogle) {
    checkUser(data.email).then(async ({ found, user }) => {
      if (found) {
        await comparePasswords(data.password, user.password).then(
          async (result) => {
            if (result) {
              await signin(user).then((token) => {
                return res.status(200).json({
                  status: "success",
                  message: "user logged in",
                  token: token,
                });
              });
            } else {
              return res.status(400).json({
                status: "error",
                message: "Incorrect password",
              });
            }
          }
        );
      } else {
        return res.status(400).json({
          status: "error",
          message: "Email not found",
        });
      }
    });
  }
};

export const deleteUser = async (req, res) => {
  const data = {
    user_id: req.body.user_id,
  };

  try {
    await deleteUser(data.user_id)
      .then(async (result) => {
        await deleteAccounts(data.user_id)
          .then((result) => {
            return res.status(200).json({
              status: "success",
              message: "User deleted",
            });
          })
          .catch((error) => {
            throw new Error(error);
          });
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error,
    });
  }
};
