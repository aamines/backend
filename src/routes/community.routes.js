const router=require("express").Router()
const routes=require("../controllers/community.controller")

router.post("/new",routes.createCommunity)

module.exports=router