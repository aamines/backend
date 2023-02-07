const { createPost } = require("../controllers/auth/posts.controller");
const { addReactionToComment } = require("../controllers/auth/posts.controller.js");
const { addCommentToPost } = require("../controllers/auth/posts.controller.js");
const { addReactionToPost } = require("../controllers/auth/posts.controller.js");
const { loadComment } = require("../controllers/auth/posts.controller.js");
const { loadPostComments } = require("../controllers/auth/posts.controller.js");
const { loadPostReactions } = require("../controllers/auth/posts.controller.js");
const { loadPosts } = require("../controllers/auth/posts.controller.js");
const express = require("express");

const router=express.Router()

router.post("/newPost", createPost)
router.get("/loadPosts", loadPosts)
router.post("/newPostReaction", addReactionToPost)
router.get("/loadPostReactions", loadPostReactions)
router.post("/newCommentReaction", addReactionToComment)
router.post("/addCommentToPost", addCommentToPost)
router.get("/loadPostComments", loadPostComments)
router.get("/loadComment", loadComment)


module.exports = router;