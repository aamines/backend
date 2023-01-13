import express from "express";
import { changePasswordController, forgotPasswordController, getUserDetails, loginController, register, 
    resetPasswordController, verifyEmailController } from "../controllers/auth/auth.controller";

const router = express.Router();

// Create a user
router.post("/register", register);

// Verify email
router.put("/verify-email", verifyEmailController);

// Login
router.post("/login", loginController);

// Forgot password
router.post("/forgot-password", forgotPasswordController);

// Reset passowrd
router.put("/reset-password", resetPasswordController);

// Change password
router.put("/change-password", changePasswordController);

// Get user details
router.get("/user-details", getUserDetails);