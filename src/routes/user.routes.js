const express = require("express");

//controllers
const { updateUser } = require("../controllers/user.controller");

//middlewares
const { protect } = require("../middlewares/protect.middleware");
const { updateUserValidation } = require("../middlewares/auth.middleware");

const router = express.Router();

//routes
router.put("/update-user", protect, updateUserValidation, updateUser);

module.exports = router;
