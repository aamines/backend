const express = require("express");

//controllers
const {
  getStories,
  createStory,
  getStoryById,
} = require("../controllers/memory.controller");
const { protect } = require("../middlewares/protect.middleware");

const router = express.Router();

router.get("/story/:id", protect, getStoryById);
router.post("/create", protect, createStory);
router.get("/:id", protect, getStories);

module.exports = router;
