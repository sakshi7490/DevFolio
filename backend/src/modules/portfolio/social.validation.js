import Joi from "joi";

const updateSocialSchema = Joi.object({
  github: Joi.string()
    .trim()
    .uri()
    .allow(""),

  linkedin: Joi.string()
    .trim()
    .uri()
    .allow(""),

  twitter: Joi.string()
    .trim()
    .uri()
    .allow(""),

  instagram: Joi.string()
    .trim()
    .uri()
    .allow(""),

  website: Joi.string()
    .trim()
    .uri()
    .allow(""),
});

export default updateSocialSchema;