const express = require("express");

//controllers
const {
  createPost,
  addReactionToComment,
  addCommentToPost,
  addReactionToPost,
  loadComment,
  loadPostComments,
  loadPostReactions,
  loadPosts,
} = require("../controllers/posts.controller");

const router = express.Router();

router.post("/newPost", createPost);
router.get("/loadPosts", loadPosts);
router.post("/newPostReaction", addReactionToPost);
router.get("/loadPostReactions", loadPostReactions);
router.post("/newCommentReaction", addReactionToComment);
router.post("/addCommentToPost", addCommentToPost);
router.get("/loadPostComments", loadPostComments);
router.get("/loadComment", loadComment);

module.exports = router;
