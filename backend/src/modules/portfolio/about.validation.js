import Joi from "joi";

const updateAboutSchema = Joi.object({
  content: Joi.string()
    .trim()
    .max(2000)
    .allow(""),
});

export default updateAboutSchema;