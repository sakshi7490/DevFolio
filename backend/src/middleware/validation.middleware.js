import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      const errors = error.details.map((detail) => detail.message);

      throw new ApiError(400, "Validation failed", errors);
    }

    // Replace request body with sanitized data
    req.body = value;

    next();
  };
};

export default validate;