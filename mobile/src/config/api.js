
const API_URL = process.env.EXPO_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("Missing EXPO_PUBLIC_API_URL in .env");
}

export default API_URL;

/*
Profile.js > ${API_URL}/api/profiles
AICoach.js > ${API_URL}/api/ai/chat
*/ 