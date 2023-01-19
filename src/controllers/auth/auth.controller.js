import { changePassword, createUser, forgotPassword, 
    getUserById, login, resetPassword, verifyEmail } from "../../services/auth/auth.service.js"

// Create a new user
export const register = async (req,res) => {
    try {
        const data = req.body;
        const result = await createUser(data);
        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Verify Email 
export const verifyEmailController = async (req,res) => {
    try {
        const { email, code } = req.body;
        const result = await verifyEmail(email, code);
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Login
export const loginController = async (req,res) => {
    try {
        const { email, password } = req.body;
        const result  = await login(email, password);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Get info of the logged in user
export const getUserDetails = async(req,res) => {
    try {
        const result = await getUserById(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Forgot password
export const forgotPasswordController = async(req,res) => {
    try {
        const email = req.body.email;
        result = await forgotPassword(email);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status.json(error);
    }
}

// Reset password
export const resetPasswordController = async(req,res) => {
    try {
        const { email, code, password } = req.body;
        const result = await resetPassword(email, code, password);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status.json(error);
    }
}

// Change password
export const changePasswordController = async(req,res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const result = await changePassword(email, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status.json(error);
    }
}