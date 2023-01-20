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
postrouter.get("/loadPosts",loadPosts)
postrouter.post("/newPostReaction",addReactionToPost)
postrouter.get("/loadPostReactions",loadPostReactions)
postrouter.post("/newCommentReaction",addReactionToComment)
postrouter.post("/addCommentToPost",addCommentToPost)
postrouter.get("/loadPostComments",loadPostComments)
postrouter.get("/loadComment",loadComment)




export default postrouter


