/* 
  AI controller for ByteBurn Nutrition AI Coach.
  Handles incoming chat requests and communicates with the AI service to get responses.
*/

const { getAIReply } = require("./aiService");

async function chat(req, res) {
  try {
    const {
      message,
      profile,
      diaryLogs,
      diaryDate,
      favoriteFoods,
    } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "A message is required",
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        error: "Message must be 2000 characters or less",
      });
    }

    const reply = await getAIReply(
      message.trim(),
      profile ?? null,
      Array.isArray(diaryLogs) ? diaryLogs : [],
      diaryDate ?? null,
      Array.isArray(favoriteFoods) ? favoriteFoods : []
    );

    res.json({ reply });
       } catch (error) {
        console.error("AI Coach error details:", {
          message: error.message,
          status: error.status,
          code: error.code,
          type: error.type,
          name: error.name,
        });

        res.status(500).json({
          error: "Unable to get an AI response. Please try again.",
        });
      }
    }
 
module.exports = { chat };

// AI Response = { reply: "AI-generated response from the OpenAI API" }
// User Request = { message: "How many calories should I eat today?" }