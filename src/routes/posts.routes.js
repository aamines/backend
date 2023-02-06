import { createPost } from "../controllers/auth/posts.controller.js";
import { addReactionToComment } from "../controllers/auth/posts.controller.js";
import { addCommentToPost } from "../controllers/auth/posts.controller.js";
import { addReactionToPost } from "../controllers/auth/posts.controller.js";
import { loadComment } from "../controllers/auth/posts.controller.js";
import { loadPostComments } from "../controllers/auth/posts.controller.js";
import { loadPostReactions } from "../controllers/auth/posts.controller.js";
import { loadPosts } from "../controllers/auth/posts.controller.js";
import express from "express"

const postrouter=express.Router()

postrouter.post("/newPost",createPost)
postrouter.get("/loadPosts",loadPosts)
postrouter.post("/newPostReaction",addReactionToPost)
postrouter.get("/loadPostReactions",loadPostReactions)
postrouter.post("/newCommentReaction",addReactionToComment)
postrouter.post("/addCommentToPost",addCommentToPost)
postrouter.get("/loadPostComments",loadPostComments)
postrouter.get("/loadComment",loadComment)




export default postrouter


