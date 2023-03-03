const story=require("../controllers/auth/story.controller.js")
const router=require("express").Router()

router.get("/all",story.loadStory)
router.post("/new",story.createStory)
router.get("/story/id",story.loadWithStoryId)


module.exports=router
