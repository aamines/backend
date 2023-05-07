const express = require("express");

const router = express.Router();

//controllers
const {
  inviteMembers,
  getCommunityById,
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
router.post("/invite", protect, inviteMembers);
router.get("/:community", protect, getCommunityById);

module.exports = router;
