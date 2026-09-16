import Joi from "joi";

const createExperienceSchema = Joi.object({
  company: Joi.string()
    .trim()
    .max(200)
    .required()
    .messages({
      "any.required": "Company name is required",
      "string.empty": "Company name is required",
      "string.max":
        "Company name cannot exceed 200 characters",
    }),

  position: Joi.string()
    .trim()
    .max(150)
    .required()
    .messages({
      "any.required": "Position is required",
      "string.empty": "Position is required",
      "string.max":
        "Position cannot exceed 150 characters",
    }),

  location: Joi.string()
    .trim()
    .max(150)
    .allow(""),

  startDate: Joi.date()
    .required()
    .messages({
      "any.required": "Start date is required",
      "date.base": "Start date must be a valid date",
    }),

  endDate: Joi.date()
    .allow(null, "")
    .min(Joi.ref("startDate"))
    .messages({
      "date.min": "End date cannot be before start date",
    }),

  isCurrent: Joi.boolean().default(false),

  description: Joi.string()
    .trim()
    .max(2000)
    .allow("")
    .messages({
      "string.max":
        "Experience description cannot exceed 2000 characters",
    }),
});

const updateExperienceSchema = Joi.object({
  company: Joi.string().trim().max(200),
  position: Joi.string().trim().max(150),
  location: Joi.string().trim().max(150).allow(""),

  startDate: Joi.date(),

  endDate: Joi.date()
    .allow(null, "")
    .min(Joi.ref("startDate"))
    .messages({
      "date.min": "End date cannot be before start date",
    }),

  isCurrent: Joi.boolean(),

  description: Joi.string().trim().max(2000).allow(""),
})
  .min(1)
  .messages({
    "object.min":
      "At least one experience field is required",
  });

export {
  createExperienceSchema,
  updateExperienceSchema,
};