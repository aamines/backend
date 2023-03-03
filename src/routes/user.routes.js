const express = require("express");

//controllers
const { updateUser } = require("../controllers/user/user.controller");

//middlewares
const { protect } = require("../middlewares/protect");
const { updateUserValidation } = require("../middlewares/authValidation");

const router = express.Router();

//routes
router.put("/update-user", protect, updateUserValidation, updateUser);

module.exports = router;
