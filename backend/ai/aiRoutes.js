/* 
  AI routes for ByteBurn Nutrition AI Coach.
  Defines the API endpoints for interacting with the AI Coach.
*/
const express = require("express");
const { chat } = require("./aiController");

const router = express.Router();

router.post("/chat", chat);

module.exports = router;
