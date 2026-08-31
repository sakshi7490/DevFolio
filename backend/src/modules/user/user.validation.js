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

  headline: Joi.string()
    .trim()
    .max(100)
    .allow(""),

  bio: Joi.string()
    .trim()
    .max(500)
    .allow(""),

  location: Joi.string()
    .trim()
    .max(100)
    .allow(""),

  phone: Joi.string()
    .trim()
    .max(20)
    .allow(""),

  website: Joi.string()
    .trim()
    .uri({
      scheme: ["http", "https"],
    })
    .allow(""),

  profileImage: Joi.string()
    .trim()
    .uri({
      scheme: ["http", "https"],
    })
    .allow(""),

  socialLinks: Joi.object({
    github: Joi.string()
      .trim()
      .uri({
        scheme: ["http", "https"],
      })
      .allow(""),

    linkedin: Joi.string()
      .trim()
      .uri({
        scheme: ["http", "https"],
      })
      .allow(""),

    twitter: Joi.string()
      .trim()
      .uri({
        scheme: ["http", "https"],
      })
      .allow(""),
  }),
})
  .min(1)
  .unknown(false);