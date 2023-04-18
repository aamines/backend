const express = require("express");

//controllers
const {
  updateUser,
  getUserDetails,
} = require("../controllers/user.controller");

//middlewares
const { protect } = require("../middlewares/protect.middleware");
const { updateUserValidation } = require("../middlewares/auth.middleware");

const router = express.Router();

//routes
router.get("/:id", protect, getUserDetails);
router.put("/update", protect, updateUserValidation, updateUser);

module.exports = router;
