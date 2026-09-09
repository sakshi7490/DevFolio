import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PortfolioForm from "../components/PortfolioForm";
import portfolioService from "../portfolioService";

const CreatePortfolio = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (portfolioData) => {
    try {
      setLoading(true);
      setError("");

      await portfolioService.createPortfolio(portfolioData);

      navigate("/dashboard/portfolios");
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to create portfolio";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/portfolios");
  };

  return (
    <div className="min-h-full bg-[#08090d] p-6">
      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Create Portfolio
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create a new developer portfolio.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form Card */}
        <div className="rounded-xl border border-gray-800 bg-[#0d0e14] p-6 shadow-xl">
          <PortfolioForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </div>

      </div>
    </div>
  );
};

export default CreatePortfolio;