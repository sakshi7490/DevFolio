import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import portfolioService from "../portfolioService";
import PortfolioCard from "../components/PortfolioCard";

const PortfolioList = () => {
  const navigate = useNavigate();

  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPortfolios = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await portfolioService.getPortfolios();

      setPortfolios(response.data || []);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load portfolios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <div className="min-h-full bg-[#08090d] p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-white">My Portfolios</h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your developer portfolios.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard/portfolios/create")}
            className="rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-cyan-400"
          >
            + Create Portfolio
          </button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-xl border border-gray-800 bg-[#0d0e14]"
              />
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-center">
            <p className="text-sm text-red-400">{error}</p>

            <button
              onClick={fetchPortfolios}
              className="mt-4 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-cyan-400 hover:text-cyan-400"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && portfolios.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-700 bg-[#0d0e14] px-6 py-16 text-center">
            <h2 className="text-lg font-medium text-white">
              No portfolios yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Create your first portfolio to get started.
            </p>

            <button
              onClick={() => navigate("/dashboard/portfolios/create")}
              className="mt-6 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-cyan-400"
            >
              Create Portfolio
            </button>
          </div>
        )}

        {/* Portfolio Cards */}
        {!loading && !error && portfolios.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio._id}
                portfolio={portfolio}
                onDelete={(deletedId) => {
                  setPortfolios((prev) =>
                    prev.filter((portfolio) => portfolio._id !== deletedId),
                  );
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioList;
