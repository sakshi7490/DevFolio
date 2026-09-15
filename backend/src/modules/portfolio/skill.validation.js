import Joi from "joi";

const createSkillSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(100)
    .required(),

  level: Joi.string()
    .valid("Beginner", "Intermediate", "Advanced", "Expert")
    .default("Intermediate"),
});

const updateSkillSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(100),

  level: Joi.string()
    .valid("Beginner", "Intermediate", "Advanced", "Expert"),
}).min(1);

export {
  createSkillSchema,
  updateSkillSchema,
};