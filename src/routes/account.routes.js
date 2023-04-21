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

router.delete("/leave/:id", leaveController);
router.get("/communities", listCommunities);
router.post("/join", addPersonController);
router.get("/members", listMembers);
router.get("/:id", getAccount);

module.exports = router;
