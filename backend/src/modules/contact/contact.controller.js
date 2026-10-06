import asyncHandler from "../../utils/asyncHandler.js";
import contactService from "./contact.service.js";

export const createMessage = asyncHandler(async (req, res) => {
  const message = await contactService.createMessage(
    req.params.slug,
    req.body,
  );

  res.status(201).json({
    success: true,
    message: "Message sent successfully",
    data: {
      message,
    },
  });
});

export const getMessages = asyncHandler(async (req, res) => {
  const messages = await contactService.getMessages(
    req.params.portfolioId,
    req.user._id,
  );

  res.status(200).json({
    success: true,
    data: {
      messages,
    },
  });
});

export const updateMessageReadStatus = asyncHandler(
  async (req, res) => {
    const message = await contactService.updateMessageReadStatus(
      req.params.messageId,
      req.user._id,
      req.body.isRead,
    );

    res.status(200).json({
      success: true,
      message: "Message status updated",
      data: {
        message,
      },
    });
  },
);

export const deleteMessage = asyncHandler(async (req, res) => {
  await contactService.deleteMessage(
    req.params.messageId,
    req.user._id,
  );

  res.status(200).json({
    success: true,
    message: "Message deleted successfully",
  });
});