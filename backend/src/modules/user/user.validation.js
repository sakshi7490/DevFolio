import Joi from "joi";

export const updateProfileSchema = Joi.object({
  name: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .messages({
      "string.min": "Name must be at least 2 characters",
      "string.max": "Name cannot exceed 50 characters",
    }),

  profileImage: Joi.string()
    .trim()
    .allow("")
    .messages({
      "string.base": "Profile image must be a string",
    }),

  githubUsername: Joi.string()
    .trim()
    .allow("")
    .messages({
      "string.base": "GitHub username must be a string",
    }),
}).min(1);