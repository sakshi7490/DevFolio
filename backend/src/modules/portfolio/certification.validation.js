import Joi from "joi";

const createCertificationSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(200)
    .required(),

  issuer: Joi.string()
    .trim()
    .max(200)
    .required(),

  issueDate: Joi.date()
    .allow(null, ""),

  credentialUrl: Joi.string()
    .trim()
    .uri()
    .allow(""),

  description: Joi.string()
    .trim()
    .max(1000)
    .allow(""),
});

const updateCertificationSchema = createCertificationSchema
  .fork(["name", "issuer"], (schema) =>
    schema.optional()
  )
  .min(1);

export {
  createCertificationSchema,
  updateCertificationSchema,
};