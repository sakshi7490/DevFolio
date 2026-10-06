import api from "./api";

const getMessages = async (portfolioId) => {
  const response = await api.get(
    `/contact/portfolio/${portfolioId}`,
  );

  return response.data.data.messages;
};

const updateMessageReadStatus = async (messageId, isRead) => {
  const response = await api.patch(
    `/contact/${messageId}/read`,
    { isRead },
  );

  return response.data.data.message;
};

const deleteMessage = async (messageId) => {
  const response = await api.delete(
    `/contact/${messageId}`,
  );

  return response.data;
};

export default {
  getMessages,
    updateMessageReadStatus,
    deleteMessage,
};

