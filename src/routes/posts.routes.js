import { createPost } from "../controllers/auth/posts.controller";
import { addReactionToComment } from "../controllers/auth/posts.controller";
import { addCommentToPost } from "../controllers/auth/posts.controller";
import { addReactionToPost } from "../controllers/auth/posts.controller";
import { loadComment } from "../controllers/auth/posts.controller";
import { loadPostComments } from "../controllers/auth/posts.controller";
import { loadPostReactions } from "../controllers/auth/posts.controller";
import { loadPosts } from "../controllers/auth/posts.controller";
import express from "express"

const postrouter=express.Router()

postrouter.post("/newPost",createPost)
postrouter.post("/newCommentReaction",addReactionToComment)
postrouter.post("/newPostReaction",addReactionToPost)
postrouter.post("/addCommentToPost",addCommentToPost)
postrouter.get("/loadComment",loadComment)
postrouter.get("/loadPostComments",loadPostComments)
postrouter.get("/loadPostReactions",loadPostReactions)
postrouter.get("/loadPosts",loadPosts)

export default postrouter


