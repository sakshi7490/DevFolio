const aboutPrompt = (content) => `
You are a professional portfolio content writer.

Generate a concise and professional "About Me" section for a developer portfolio.

Use the following information:
${content}

Requirements:
- Write in first person.
- Keep it professional and natural.
- Highlight relevant technical skills and interests.
- Do not invent qualifications or experience.
- Keep it between 80 and 120 words.
- Return only the final About Me content.
`;

const improveProjectPrompt = (description) => `
You are a professional technical writer.

Improve the following project description for a developer portfolio:

${description}

Requirements:
- Make it clear, concise, and professional.
- Highlight the project's purpose, technical implementation, and impact.
- Preserve the original facts.
- Do not invent features or technologies.
- Return only the improved description.
`;

const suggestSkillsPrompt = (content) => `
You are a technical career assistant.

Suggest relevant technical skills for a developer portfolio based on the following information:

${content}

Requirements:
- Suggest only skills that are reasonably related to the provided information.
- Do not invent skills that have no connection to the information.
- Group the suggestions into relevant categories when appropriate.
- Return a concise list of skills.
`;

const improveGrammarPrompt = (content) => `
You are a professional English editor.

Improve the grammar, clarity, and readability of the following portfolio content:

${content}

Requirements:
- Preserve the original meaning.
- Do not add new information.
- Keep the tone professional and natural.
- Return only the improved content.
`;

export default {
  aboutPrompt,
  improveProjectPrompt,
  suggestSkillsPrompt,
  improveGrammarPrompt,
};