import express from "express";
import { changePasswordController, forgotPasswordController, getUserDetails, loginController, register, 
    resetPasswordController, verifyEmailController } from "../controllers/auth/auth.controller.js";
import { forgotPasswordValidation, loginValidation, newPasswordValidation, 
    registerValidation, resetPasswordValidation, verifyEmailValidation } from "../middlewares/authValidation.js";
import { protect } from "../middlewares/protect.js";

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

export default router;