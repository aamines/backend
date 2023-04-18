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

router.post("/new", newCommunityValidation, createCommunityController);

module.exports = router;
