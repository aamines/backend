const express = require("express");

//controllers
const {
  loadPosts,
  createPost,
  loadComment,
  addCommentToPost,
  loadPostComments,
  addReactionToPost,
  loadPostReactions,
  addReactionToComment,
} = require("../controllers/posts.controller");

const router = express.Router();

router.get("/loadPosts", loadPosts);
router.post("/newPost", createPost);
router.get("/loadComment", loadComment);
router.get("/loadPostComments", loadPostComments);
router.post("/newPostReaction", addReactionToPost);
router.post("/addCommentToPost", addCommentToPost);
router.get("/loadPostReactions", loadPostReactions);
router.post("/newCommentReaction", addReactionToComment);

module.exports = router;
