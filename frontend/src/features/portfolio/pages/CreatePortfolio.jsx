import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioForm from "../components/PortfolioForm";
import portfolioService from "../portfolioService";
import PageHeader from "../../../components/common/PageHeader";
import Alert from "../../../components/common/Alert";
import { cardClass } from "../../../styles/ui";

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 const handleSubmit = async ({ portfolioData, imageFile }) => {
  try {
    setLoading(true);
    setError("");

    const response = await portfolioService.createPortfolio(
      portfolioData
    );

    const portfolioId = response.data._id;

    if (imageFile) {
      await portfolioService.uploadPortfolioImage(
        portfolioId,
        imageFile
      );
    }

    navigate("/dashboard/portfolios");
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Failed to create portfolio"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="New work"
        title="Create portfolio"
        description="Create a new developer portfolio."
      />
      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}
      <div className={cardClass}>
        <PortfolioForm
          onSubmit={handleSubmit}
          onCancel={() => navigate("/dashboard/portfolios")}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreatePortfolio;
