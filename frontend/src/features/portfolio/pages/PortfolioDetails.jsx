import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import portfolioService from "../portfolioService";

const PortfolioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await portfolioService.getPortfolio(id);

      setPortfolio(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load portfolio"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-full bg-[#08090d] p-6">
        <div className="mx-auto max-w-4xl">
          <div className="h-72 animate-pulse rounded-xl border border-gray-800 bg-[#0d0e14]" />

          <div className="mt-6 space-y-4">
            <div className="h-8 w-1/2 animate-pulse rounded bg-[#0d0e14]" />
            <div className="h-20 animate-pulse rounded bg-[#0d0e14]" />
          </div>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#08090d] p-6">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <h2 className="text-lg font-medium text-white">
            Unable to load portfolio
          </h2>

          <p className="mt-2 text-sm text-red-400">
            {error}
          </p>

          <button
            onClick={() => navigate("/dashboard/portfolios")}
            className="mt-5 rounded-lg border border-gray-700 px-4 py-2 text-sm text-gray-300 transition hover:border-cyan-400 hover:text-cyan-400"
          >
            ← Back to Portfolios
          </button>
        </div>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  return (
    <div className="min-h-full bg-[#08090d] p-6">
      <div className="mx-auto max-w-4xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/portfolios")}
          className="mb-6 text-sm text-gray-500 transition hover:text-cyan-400"
        >
          ← Back to Portfolios
        </button>

        {/* Portfolio Card */}
        <div className="overflow-hidden rounded-xl border border-gray-800 bg-[#0d0e14]">

          {/* Featured Image */}
          {portfolio.featuredImage && (
            <div className="h-72 overflow-hidden bg-[#08090d]">
              <img
                src={portfolio.featuredImage}
                alt={portfolio.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 md:p-8">

            {/* Title */}
            <div>
              <h1 className="text-3xl font-semibold text-white">
                {portfolio.title}
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Created on{" "}
                {new Date(
                  portfolio.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                About
              </h2>

              <p className="mt-3 leading-7 text-gray-300">
                {portfolio.description ||
                  "No description added."}
              </p>
            </div>

            {/* Technologies */}
            <div className="mt-8">
              <h2 className="text-sm font-medium uppercase tracking-wider text-gray-400">
                Technologies
              </h2>

              {portfolio.technologies?.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {portfolio.technologies.map(
                    (technology, index) => (
                      <span
                        key={`${technology}-${index}`}
                        className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-3 py-1.5 text-sm text-cyan-400"
                      >
                        {technology}
                      </span>
                    )
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-600">
                  No technologies added.
                </p>
              )}
            </div>

            {/* Links */}
            <div className="mt-8 flex flex-wrap gap-3 border-t border-gray-800 pt-6">

              {portfolio.liveUrl && (
                <a
                  href={portfolio.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-cyan-500 px-4 py-2.5 text-sm font-medium text-black transition hover:bg-cyan-400"
                >
                  View Live ↗
                </a>
              )}

              {portfolio.githubUrl && (
                <a
                  href={portfolio.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-300 transition hover:border-cyan-400 hover:text-cyan-400"
                >
                  GitHub ↗
                </a>
              )}

              <button
                onClick={() =>
                  navigate("/dashboard/portfolios")
                }
                className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm font-medium text-gray-400 transition hover:border-gray-500 hover:text-gray-300"
              >
                Back
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;