const router=require("express").Router()
const routes=require("../controllers/community/community.controller")

router.post("/new",routes.createCommunity)

module.exports=router