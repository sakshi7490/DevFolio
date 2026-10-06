import rateLimit from "express-rate-limit";

const contactRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many messages. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export default contactRateLimit;