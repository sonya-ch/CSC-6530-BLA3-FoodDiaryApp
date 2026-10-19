/* 
  AI service for ByteBurn Nutrition AI Coach.
  Handles communication with the OpenAI API and provides AI-generated responses.
*/

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// Initial Prompt for the AI Coach
// These instructions define the behavior and responsibilities of the AI Coach.
const SYSTEM_INSTRUCTIONS = `
You are ByteBurn AI Coach, a friendly nutrition assistant.

Your responsibilities:
- Answer questions about food, calories, protein, and balanced nutrition.
- Give practical, easy-to-understand suggestions.
- Be supportive and avoid shaming users about food or body weight.
- Do not invent personal food diary or profile data.
- If personal data is not provided, ask the user for the information you need.
- Do not diagnose medical conditions or recommend extreme diets.
- Reply in the same language the user uses.
- Keep answers concise and easy to read.
`;


// Function to get AI reply from the OpenAI API based on the user's message.
// @param {string} message - The user's message to send to the AI Coach.
// @returns {Promise<string>} - The AI-generated response from the OpenAI API.  
async function getAIReply(message) {
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-5-mini",
    instructions: SYSTEM_INSTRUCTIONS,
    input: message,
    max_output_tokens: 400,
  });

  return response.output_text;
}

module.exports = { getAIReply };
