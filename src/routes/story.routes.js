const story=require("../controllers/auth/story.controller")
const router=require("express").Router
router.post("/new",story.createStory)
router.get("/all",story.loadStory)
router.get("/story/id",story.loadWithStoryId)


module.exports=router
