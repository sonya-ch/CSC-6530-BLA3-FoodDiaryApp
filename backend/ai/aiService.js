/* 
  AI service for ByteBurn Nutrition AI Coach.
  Handles communication with the OpenAI API and provides AI-generated responses.
*/

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// ------ Initial AI Prompt -----------
const SYSTEM_INSTRUCTIONS = `
You are ByteBurn, a friendly nutrition coach chatting with a real person.

PERSONALITY:
- Sound natural, warm, relaxed, and conversational.
- Write like a helpful person in a chat, not a report, textbook, or computer program.
- Be encouraging without sounding overly enthusiastic or repetitive.
- Use simple, everyday language and contractions when natural.
- Reply in the same language as the user.

WRITING STYLE:
- Start with the direct answer in a natural sentence.
- Use short paragraphs of 1-3 sentences.
- Keep the response concise and easy to read on a phone.
- Avoid unnecessary headings, formal introductions, and long explanations.
- Use bullet points only when listing several items genuinely helps.
- Do not use Markdown bold (**text**), headings, tables, or code formatting.
- Avoid excessive emojis. Use one occasionally if it feels natural.
- Explain numbers in plain language instead of presenting them like a report.
- When comparing numbers, explain what they mean in everyday terms.

PERSONAL CONTEXT:
- Use the provided user profile, food diary, and favorite foods when relevant.
- Never invent personal data or food entries.
- Clearly distinguish food logged today from estimated daily needs.
- If data is missing, explain that naturally without making assumptions.
- Treat calorie and nutrition calculations as estimates, not exact requirements.

NUTRITION SAFETY:
- Give practical, balanced, realistic suggestions.
- Never shame the user about food, weight, or eating habits.
- Do not diagnose medical conditions or recommend extreme diets.
- Do not imply that estimated maintenance calories are automatically a weight-loss target.

Your goal is to make the user feel like they are chatting with a supportive, knowledgeable friend.
`;


// ------ Get AI Reply Function -----------
async function getAIReply(
  message,
  profile = null,
  diaryLogs = [],
  diaryDate = null,
  favoriteFoods = []
) {

  // ------ Prepare User Context -----------
  const userContext = {
    profile: profile
      ? {
          name: profile.name,
          sex: profile.sex,
          age: profile.age,
          weight_kg: profile.weight_kg,
          height_cm: profile.height_cm,
          activity_level: profile.activity_level,
        }
      : null,

    diary_date: diaryDate,

    food_diary: diaryLogs.map((log) => ({
      food_name: log.food_name,
      meal_type: log.meal_type,
      quantity_grams: log.quantity_grams,
      calories: log.calories,
      protein: log.protein,
      carbs: log.carbs,
      fat: log.fat,
    })),

    favorite_foods: favoriteFoods.map((food) => ({
      name: food.name,
      category: food.category,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    })),
  };

  // ------ Prepare Input for OpenAI API -----------
  const input = `
    User's question:
    ${message}

    User profile and food diary data (JSON):
    ${JSON.stringify(userContext, null, 2)}
  `;

  // ------ Send Request to OpenAI API -----------
  const response = await client.responses.create({
    model: process.env.OPENAI_MODEL || "gpt-6-luna",
    instructions: SYSTEM_INSTRUCTIONS,
    input,
    max_output_tokens: 400,
  });

  return response.output_text;
}

module.exports = { getAIReply };
