const express = require("express");

//controllers
const {
  getStories,
  createStory,
  getStoryById,
} = require("../controllers/memory.controller");
const { protect } = require("../middlewares/protect.middleware");

const router = express.Router();

router.get("/:id", protect, getStories);
router.post("/new", protect, createStory);
router.get("/story/:id", protect, getStoryById);

module.exports = router;
