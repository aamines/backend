//services
const {
  changePassword,
  createUser,
  forgotPassword,
  login,
  resetPassword,
  verifyEmail,
} = require("../services/auth.service");

// Create a new user
module.exports.registerController = async (req, res) => {
  const data = {
    names: req.body.names,
    email: req.body.email,
    country: req.body.country,
    password: req.body.password,
  };

  try {
    await createUser(data)
      .then((message) => {
        return res.status(200).json({
          message: message,
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

// Verify Email
module.exports.verifyEmailController = async (req, res) => {
  try {
    const { email, code } = req.body;
    const result = await verifyEmail(email, code);
    res.status(200).json(result);
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
      .then((token) => {
        return res.status(200).json({
          message: "Login successful",
          token: token,
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
