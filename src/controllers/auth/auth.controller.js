const { changePassword, createUser, forgotPassword, 
    getUserById, login, resetPassword, verifyEmail } = require("../../services/auth/auth.service.js");

// Create a new user
module.exports.register = async (req,res) => {
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
module.exports.verifyEmailController = async (req,res) => {
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
module.exports.loginController = async (req,res) => {
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
module.exports.getUserDetails = async(req,res) => {
    try {
        const result = await getUserById(req.user.id);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

// Forgot password
module.exports.forgotPasswordController = async(req,res) => {
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
module.exports.resetPasswordController = async(req,res) => {
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
module.exports.changePasswordController = async(req,res) => {
    try {
        const { email, oldPassword, newPassword } = req.body;
        const result = await changePassword(email, oldPassword, newPassword);
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status.json(error);
    }
}