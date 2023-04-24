//services
const {
  changePassword,
  createUser,
  forgotPassword,
  login,
  resetPassword,
  verifyEmail,
  verifyToken,
} = require("../services/auth.service");
const { hasAccount } = require("../services/user.service");

// Create a new user
module.exports.registerController = async (req, res) => {
  const data = {
    email: req.body.email,
    gender: req.body.gender,
    country: req.body.country,
    password: req.body.password,
  };

  try {
    await createUser(data)
      .then(async (message) => {
        await login(data.email, data.password)
          .then((token) => {
            return res.status(200).json({
              message: "Account created successfully",
              data: token,
            });
          })
          .catch((error) => {
            throw new Error(error.message);
          });
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Verify token
module.exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;

    await verifyToken(token)
      .then((message) => {
        return res.status(200).json({
          message: "token is valid",
        });
      })
      .catch((error) => {
        throw new Error("Invalid token");
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Verify Email
module.exports.verifyEmailController = async (req, res) => {
  try {
    const { email, code } = req.body;

    await verifyEmail(email, code)
      .then((message) => {
        return res.status(200).json({
          message: message,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Login
module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    await login(email, password)
      .then((data) => {
        hasAccount(data.user.id).then((response) => {
          return res.status(200).json({
            message: "Login successful",
            account: response,
            token: data.token,
          });
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Forgot password
module.exports.forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    await forgotPassword(email)
      .then((message) => {
        return res.status(200).json({
          message: message,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

// Reset password
module.exports.resetPasswordController = async (req, res) => {
  try {
    const { email, code, password } = req.body;
    await resetPassword(email, code, password)
      .then((message) => {
        return res.status(200).json({
          message: message,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Change password
module.exports.changePasswordController = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    await changePassword(email, oldPassword, newPassword)
      .then((message) => {
        return res.status(200).json({
          message: message,
        });
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
