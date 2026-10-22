/* 
  AI routes for ByteBurn Nutrition AI Coach.
  Defines the API endpoints for interacting with the AI Coach.
*/

const express = require("express");
const { chat } = require("./aiController");

const router = express.Router();

router.post("/chat", chat); // Route > app.use("/api/ai", aiRoutes) = /api/ai/chat

module.exports = router;
