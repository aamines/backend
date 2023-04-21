const express = require("express");

//controllers
const {
  updateUser,
  getUserDetails,
  getMemberCommunities,
} = require("../controllers/user.controller");

//middlewares
const { protect } = require("../middlewares/protect.middleware");
const { updateUserValidation } = require("../middlewares/auth.middleware");

const router = express.Router();

//routes
router.put("/update", protect, updateUserValidation, updateUser);
router.get("/communities", protect, getMemberCommunities);
router.get("/:id", protect, getUserDetails);

module.exports = router;
