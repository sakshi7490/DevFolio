import Joi from "joi";

const createProjectSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(200)
    .required()
    .messages({
      "any.required": "Project title is required",
      "string.empty": "Project title is required",
      "string.max":
        "Project title cannot exceed 200 characters",
    }),

  description: Joi.string()
    .trim()
    .max(2000)
    .allow("")
    .messages({
      "string.max":
        "Project description cannot exceed 2000 characters",
    }),

  technologies: Joi.array()
    .items(Joi.string().trim().max(100))
    .default([]),

  projectUrl: Joi.string()
    .trim()
    .uri()
    .allow("")
    .messages({
      "string.uri": "Project URL must be a valid URL",
    }),

  githubUrl: Joi.string()
    .trim()
    .uri()
    .allow("")
    .messages({
      "string.uri": "GitHub URL must be a valid URL",
    }),

  image: Joi.string()
    .trim()
    .uri()
    .allow(""),

  startDate: Joi.date().allow(null, ""),

  endDate: Joi.date()
    .allow(null, "")
    .min(Joi.ref("startDate"))
    .messages({
      "date.min": "End date cannot be before start date",
    }),
});

const updateProjectSchema = Joi.object({
  title: Joi.string().trim().max(200),
  description: Joi.string().trim().max(2000).allow(""),

  technologies: Joi.array().items(
    Joi.string().trim().max(100)
  ),

  projectUrl: Joi.string().trim().uri().allow(""),

  githubUrl: Joi.string().trim().uri().allow(""),

  image: Joi.string().trim().uri().allow(""),

  startDate: Joi.date().allow(null, ""),

  endDate: Joi.date()
    .allow(null, "")
    .min(Joi.ref("startDate"))
    .messages({
      "date.min": "End date cannot be before start date",
    }),
})
  .min(1)
  .messages({
    "object.min": "At least one project field is required",
  });

export {
  createProjectSchema,
  updateProjectSchema,
};