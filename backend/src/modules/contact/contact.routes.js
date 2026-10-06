import express from "express";
import contactRateLimit from "../../middleware/contactRateLimit.middleware.js";
import { protect } from "../../middleware/auth.middleware.js";
import { createMessage, getMessages,updateMessageReadStatus, deleteMessage,} from "./contact.controller.js";

const router = express.Router();

router.post(
  "/:slug",
  contactRateLimit,
  createMessage,
);
router.get(
  "/portfolio/:portfolioId",
  protect,
  getMessages,
);

router.patch(
  "/:messageId/read",
  protect,
  updateMessageReadStatus,
);

router.delete(
  "/:messageId",
  protect,
  deleteMessage,
);
export default router;