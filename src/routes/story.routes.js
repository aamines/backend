const express = require("express");

//controllers
const story = require("../controllers/story.controller");

const router = express.Router();

router.post("/new", story.createStory);
router.get("/all", story.loadStory);
router.get("/story/id", story.loadWithStoryId);

module.exports = router;
