// src/config.ts
const config = {
  apiKey: import.meta.env.VITE_SPOONACULAR_API_KEY as string,
  geminiApiKey: import.meta.env.VITE_GEMINI_API_KEY,
  deepaiApiKey: import.meta.env.VITE_DEEPAI_API_KEY,
};
export default config;
