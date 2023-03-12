const router = require("express").Router();
const {
  createCommunityController,
} = require("../controllers/community.controller");

router.post("/new", createCommunityController);

module.exports = router;
