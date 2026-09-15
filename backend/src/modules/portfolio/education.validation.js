import Joi from "joi";

const createEducationSchema = Joi.object({
  institution: Joi.string()
    .trim()
    .max(200)
    .required(),

  degree: Joi.string()
    .trim()
    .max(150)
    .required(),

  fieldOfStudy: Joi.string()
    .trim()
    .max(150)
    .allow(""),

  startDate: Joi.date()
    .allow(null, ""),

  endDate: Joi.date()
    .allow(null, ""),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow(""),
});

const updateEducationSchema = createEducationSchema
  .fork(["institution", "degree"], (schema) =>
    schema.optional()
  )
  .min(1);

export {
  createEducationSchema,
  updateEducationSchema,
};