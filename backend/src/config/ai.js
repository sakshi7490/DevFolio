import { GoogleGenerativeAI } from "@google/generative-ai";

const gemini = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const aiModel = gemini.getGenerativeModel({
  model: "gemini-3.5-flash-lite",
});

export default aiModel;