const express = require("express");

//importing the account controllers

const {
  addPersonController,
  leaveController,
  listMembers,
  listCommunities,
  getAccount,
} = require("../controllers/account.controller");

const router = express.Router();

//implementing account routes

router.get("/:id", getAccount);
router.get("/members", listMembers);
router.post("/join", addPersonController);
router.get("/communities", listCommunities);
router.delete("/leave/{:id}", leaveController);

module.exports = router;
