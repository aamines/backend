const express = require("express")
const { changePasswordController, forgotPasswordController, getUserDetails, loginController, register, 
    resetPasswordController, verifyEmailController } = require("../controllers/auth/auth.controller.js")
const { forgotPasswordValidation, loginValidation, newPasswordValidation, 
    registerValidation, resetPasswordValidation, verifyEmailValidation } = require("../middlewares/authValidation.js")
const { protect } = require("../middlewares/protect.js")

const router = express.Router();

// Create a user
router.post("/register", registerValidation, register);

// Verify email
router.put("/verify-email", verifyEmailValidation, verifyEmailController);

// Login
router.post("/login", loginValidation, loginController);

// Forgot password
router.post("/forgot-password", forgotPasswordValidation, forgotPasswordController);

// Reset passowrd
router.put("/reset-password", resetPasswordValidation, resetPasswordController);

// Change password
router.put("/change-password", newPasswordValidation, changePasswordController);

// Get user details
router.get("/user-details", protect, getUserDetails);

module.exports = router;