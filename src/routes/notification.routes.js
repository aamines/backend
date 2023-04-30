const express = require("express");

//controllers
const { protect } = require("../middlewares/protect.middleware");
const {
  getAccountNotifications,
  getUserNotifications,
} = require("../controllers/notification.controller");

const router = express.Router();

router.get("/user/:id", protect, getUserNotifications);
router.get("/account/:id", protect, getAccountNotifications);

module.exports = router;
