import aiModel from "../config/ai.js";

const generateContent = async (prompt, fallback = null) => {
  try {
    const result = await aiModel.generateContent(prompt);

    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("AI generation error:", error);

    const status = error?.status || error?.response?.status;

    if (status === 429) {
      const rateLimitError = new Error(
        "AI service rate limit exceeded. Please try again later.",
      );

      rateLimitError.statusCode = 429;

      throw rateLimitError;
    }

    if (fallback) {
      return fallback;
    }

    throw new Error(error?.message || "Failed to generate AI content");
  }
};

export default {
  generateContent,
};