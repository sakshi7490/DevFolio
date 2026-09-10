import api from "../../api/axios";

const createPortfolio = async (portfolioData) => {
  const response = await api.post("/portfolios", portfolioData);

  return response.data;
};

const getPortfolios = async () => {
  const response = await api.get("/portfolios");

  return response.data;
};

const getPortfolio = async (id) => {
  const response = await api.get(`/portfolios/${id}`);

  return response.data;
};

const deletePortfolio = async (id) => {
  const response = await api.delete(`/portfolios/${id}`);

  return response.data;
};

const updatePortfolioSettings = async (id, settings) => {
  const response = await api.patch(
    `/portfolios/${id}/settings`,
    settings
  );

  return response.data;
};

export default {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  deletePortfolio,
  updatePortfolioSettings,
};