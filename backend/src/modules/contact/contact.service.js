import ContactMessage from "./contact.model.js";
import Portfolio from "../portfolio/portfolio.model.js";
import ApiError from "../../utils/ApiError.js";
import emailService from "../../services/email.service.js";
import User from "../user/user.model.js";

const createMessage = async (slug, data) => {
  const portfolio = await Portfolio.findOne({
  slug,
  status: "published",
}).select("_id userId");

  if (!portfolio) {
    throw new ApiError(404, "Public portfolio not found");
  }

  const message = await ContactMessage.create({
  portfolioId: portfolio._id,
  name: data.name,
  email: data.email,
  subject: data.subject || "",
  message: data.message,
});

const user = await User.findById(portfolio.userId).select("email");

if (user?.email) {
   
  await emailService.sendEmail({
    to: user.email,
    subject: "New message on your portfolio",
    html: `
      <h2>New Portfolio Message</h2>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Subject:</strong> ${data.subject || "No subject"}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  });
}

return message;
};

const getMessages = async (portfolioId, userId) => {
  const portfolio = await Portfolio.findOne({
    _id: portfolioId,
    userId,
  }).select("_id");

  if (!portfolio) {
    throw new ApiError(404, "Portfolio not found");
  }

  return ContactMessage.find({
    portfolioId,
  }).sort({ createdAt: -1 });
};

const updateMessageReadStatus = async (
  messageId,
  userId,
  isRead,
) => {
  const message = await ContactMessage.findById(messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  const portfolio = await Portfolio.findOne({
    _id: message.portfolioId,
    userId,
  }).select("_id");

  if (!portfolio) {
    throw new ApiError(403, "Not authorized");
  }

  message.isRead = isRead;
  await message.save();

  return message;
};

const deleteMessage = async (messageId, userId) => {
  const message = await ContactMessage.findById(messageId);

  if (!message) {
    throw new ApiError(404, "Message not found");
  }

  const portfolio = await Portfolio.findOne({
    _id: message.portfolioId,
    userId,
  }).select("_id");

  if (!portfolio) {
    throw new ApiError(403, "Not authorized");
  }

  await ContactMessage.findByIdAndDelete(messageId);

  return message;
};

export default {
  createMessage,
  getMessages,
    updateMessageReadStatus,
  deleteMessage,
};