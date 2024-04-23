const { GoogleGenerativeAI } = require("@google/generative-ai");


const API_KEY = "AIzaSyBdESv6ZprDRi6XdTUG-R05_zoB8Nt-18w";
const genAI = new GoogleGenerativeAI(API_KEY);

async function generateContent(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

module.exports = { generateContent };
