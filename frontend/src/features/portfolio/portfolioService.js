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


const getPersonal = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/personal`
  );

  return response.data;
};

const updatePersonal = async (portfolioId, personalData) => {
  const response = await api.put(
    `/portfolios/${portfolioId}/personal`,
    personalData
  );

  return response.data;
};

const getAbout = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/about`
  );

  return response.data;
};

const updateAbout = async (portfolioId, aboutData) => {
  const response = await api.put(
    `/portfolios/${portfolioId}/about`,
    aboutData
  );

  return response.data;
};

const getSocial = async (portfolioId) => {
  const response = await api.get(
    `/portfolios/${portfolioId}/social`
  );

  return response.data;
};

const updateSocial = async (portfolioId, socialData) => {
  const response = await api.put(
    `/portfolios/${portfolioId}/social`,
    socialData
  );

  return response.data;
};

const uploadProfileImage = async (portfolioId, file) => {
  const formData = new FormData();
  formData.append("profileImage", file);

  const response = await api.post(
    `/portfolios/${portfolioId}/personal/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export default {
  createPortfolio,
  getPortfolios,
  getPortfolio,
  uploadProfileImage,
  getAbout,
  updateAbout,
  getSocial,
  updateSocial,

  getPersonal,
  updatePersonal,
  deletePortfolio,
  updatePortfolioSettings,
};