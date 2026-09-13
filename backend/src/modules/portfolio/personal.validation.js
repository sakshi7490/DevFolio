import Joi from "joi";

const updatePersonalSchema = Joi.object({
  name: Joi.string()
    .trim()
    .max(100)
    .allow(""),

  headline: Joi.string()
    .trim()
    .max(200)
    .allow(""),

  location: Joi.string()
    .trim()
    .max(100)
    .allow(""),

  profileImage: Joi.string()
    .trim()
    .uri()
    .allow(""),
});

export default updatePersonalSchema;