const express = require("express");

//importing the account controllers

const { addPersonController,
        leaveController,
        listMembers,
        listCommunities}=require("../controllers/account.controller")

const router = express.Router();

//implementing account routes

router.post("/join",addPersonController)
router.delete("/leave/{:id}",leaveController)
router.get("/members",listMembers)
router.get("/communities",listCommunities)

module.exports = router;
