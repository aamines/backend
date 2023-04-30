const express = require("express");

//controllers
const { protect } = require("../middlewares/protect.middleware");
const {
  getAccountNotifications,
} = require("../controllers/notification.controller");

const router = express.Router();

router.get("/account/:id", protect, getAccountNotifications);

module.exports = router;
