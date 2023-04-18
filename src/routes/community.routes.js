const express = require("express");

const router = express.Router();

//controllers
const {
  createCommunityController,
} = require("../controllers/community.controller");

//middlwares
const {
  newCommunityValidation,
} = require("../middlewares/community.middleware");
const { protect } = require("../middlewares/protect.middleware");

router.post(
  "/create",
  protect,
  newCommunityValidation,
  createCommunityController
);

module.exports = router;
