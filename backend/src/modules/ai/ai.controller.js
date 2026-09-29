import asyncHandler from "../../utils/asyncHandler.js";
import aiService from "../../services/ai.service.js";
import aiPrompts from "./ai.prompts.js";

export const generateAbout = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  const prompt = aiPrompts.aboutPrompt(content);

  const generatedContent = await aiService.generateContent(
  prompt,
  content
);

  res.status(200).json({
    success: true,
    message: "About Me content generated successfully",
    data: {
      content: generatedContent,
    },
  });
});


export const improveProjectDescription = asyncHandler(
  async (req, res) => {
    const { description } = req.body;

    if (!description || !description.trim()) {
      return res.status(400).json({
        success: false,
        message: "Project description is required",
      });
    }

    const prompt = aiPrompts.improveProjectPrompt(description);

    const improvedContent =
  await aiService.generateContent(
    prompt,
    description
  );

    res.status(200).json({
      success: true,
      message: "Project description improved successfully",
      data: {
        content: improvedContent,
      },
    });
  },
);


export const suggestSkills = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  const prompt = aiPrompts.suggestSkillsPrompt(content);

  const suggestedSkills =
  await aiService.generateContent(
    prompt,
    "No additional skills could be suggested at this time."
  );

  res.status(200).json({
    success: true,
    message: "Skills suggested successfully",
    data: {
      content: suggestedSkills,
    },
  });
});


export const improveGrammar = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content || !content.trim()) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  const prompt = aiPrompts.improveGrammarPrompt(content);

 const improvedContent =
  await aiService.generateContent(
    prompt,
    content
  );
  res.status(200).json({
    success: true,
    message: "Grammar improved successfully",
    data: {
      content: improvedContent,
    },
  });
});