import Joi from "joi";

const createPortfolioSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .required()
    .messages({
      "string.empty": "Portfolio title is required",
      "any.required": "Portfolio title is required",
      "string.min": "Portfolio title must be at least 3 characters",
      "string.max": "Portfolio title cannot exceed 100 characters",
    }),

  slug: Joi.string()
    .trim()
    .lowercase()
    .min(3)
    .max(100)
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .required()
    .messages({
      "string.empty": "Portfolio slug is required",
      "any.required": "Portfolio slug is required",
      "string.min": "Portfolio slug must be at least 3 characters",
      "string.max": "Portfolio slug cannot exceed 100 characters",
      "string.pattern.base":
        "Slug can only contain lowercase letters, numbers, and hyphens",
    }),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow("")
    .optional()
    .messages({
      "string.max": "Description cannot exceed 1000 characters",
    }),

  technologies: Joi.array()
    .items(Joi.string().trim())
    .optional(),

  liveUrl: Joi.string()
    .trim()
    .uri()
    .allow("")
    .optional()
    .messages({
      "string.uri": "Live URL must be a valid URL",
    }),

  githubUrl: Joi.string()
    .trim()
    .uri()
    .allow("")
    .optional()
    .messages({
      "string.uri": "GitHub URL must be a valid URL",
    }),

  featuredImage: Joi.string()
    .trim()
    .uri()
    .allow("")
    .optional()
    .messages({
      "string.uri": "Featured image must be a valid URL",
    }),
});

const updatePortfolioSettingsSchema = Joi.object({
  title: Joi.string()
    .trim()
    .min(3)
    .max(100)
    .messages({
      "string.min": "Portfolio title must be at least 3 characters",
      "string.max": "Portfolio title cannot exceed 100 characters",
    }),

  slug: Joi.string()
    .trim()
    .lowercase()
    .min(3)
    .max(100)
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .messages({
      "string.min": "Portfolio slug must be at least 3 characters",
      "string.max": "Portfolio slug cannot exceed 100 characters",
      "string.pattern.base":
        "Slug can only contain lowercase letters, numbers, and hyphens",
    }),

  status: Joi.string()
    .valid("draft", "published")
    .messages({
      "any.only": "Status must be either draft or published",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one portfolio setting is required",
  });

export { createPortfolioSchema, updatePortfolioSettingsSchema };

