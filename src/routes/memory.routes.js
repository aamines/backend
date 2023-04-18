const express = require("express");

//controllers
const {
  getStories,
  createStory,
  getStoryById,
} = require("../controllers/memory.controller");

const router = express.Router();

router.get("/all", getStories);
router.post("/new", createStory);
router.get("/story/:id", getStoryById);

module.exports = router;
