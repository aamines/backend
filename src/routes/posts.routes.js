const { createPost } = require("../controllers/auth/posts.controller");
const { loadPosts } = require("../controllers/auth/posts.controller.js");
const { loadComment } = require("../controllers/auth/posts.controller.js");
const { loadPostComments } = require("../controllers/auth/posts.controller.js");
const { addCommentToPost } = require("../controllers/auth/posts.controller.js");
const { loadPostReactions } = require("../controllers/auth/posts.controller.js");
const { addReactionToPost } = require("../controllers/auth/posts.controller.js");
const { addReactionToComment } = require("../controllers/auth/posts.controller.js");

const express = require("express");

const router=express.Router()

router.post("/newPost", createPost)
router.get("/loadPosts", loadPosts)
router.get("/loadComment", loadComment)
router.get("/loadPostComments", loadPostComments)
router.post("/newPostReaction", addReactionToPost)
router.post("/addCommentToPost", addCommentToPost)
router.get("/loadPostReactions", loadPostReactions)
router.post("/newCommentReaction", addReactionToComment)

module.exports = router;