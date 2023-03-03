const express = require("express");

//controllers
const {
  changePasswordController,
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController,
  verifyEmailController,
} = require("../controllers/auth.controller");

//middlewares
const {
  forgotPasswordValidation,
  loginValidation,
  newPasswordValidation,
  registerValidation,
  resetPasswordValidation,
  verifyEmailValidation,
} = require("../middlewares/auth.middleware");

const router = express.Router();

// Create a user
router.post("/login", loginValidation, loginController);
router.post("/register", registerValidation, registerController);
router.put("/verify-email", verifyEmailValidation, verifyEmailController);
router.post(
  "/forgot-password",
  forgotPasswordValidation,
  forgotPasswordController
);
router.put("/reset-password", resetPasswordValidation, resetPasswordController);
router.put("/change-password", newPasswordValidation, changePasswordController);

module.exports = router;
