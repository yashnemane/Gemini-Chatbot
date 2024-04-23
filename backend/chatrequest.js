const { GoogleGenerativeAI } = require("@google/generative-ai");


const API_KEY = "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateContent(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { generateContent };
