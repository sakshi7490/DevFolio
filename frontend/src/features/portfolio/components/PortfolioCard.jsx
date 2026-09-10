import { useState } from "react";
import { useNavigate } from "react-router-dom";
import portfolioService from "../portfolioService";

const PortfolioCard = ({ portfolio, onDelete }) => {
  const navigate = useNavigate();

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${portfolio.title}"?`,
    );

    if (!confirmed) return;

    try {
      setDeleting(true);

      await portfolioService.deletePortfolio(portfolio._id);

      onDelete(portfolio._id);
    } catch (error) {
      window.alert(
        error.response?.data?.message || "Failed to delete portfolio",
      );
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="group overflow-hidden rounded-xl border border-gray-800 bg-[#0d0e14] transition hover:border-cyan-400/40">
      {/* Featured Image */}
      <div className="h-40 overflow-hidden bg-[#08090d]">
        {portfolio.featuredImage ? (
          <img
            src={portfolio.featuredImage}
            alt={portfolio.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-gray-600">No preview image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h2 className="truncate text-lg font-semibold text-white">
          {portfolio.title}
        </h2>
        <span
          className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            portfolio.status === "published"
              ? "bg-green-500/10 text-green-400"
              : "bg-gray-500/10 text-gray-400"
          }`}
        >
          {portfolio.status === "published" ? "Published" : "Draft"}
        </span>

        <p className="mt-2 line-clamp-2 text-sm text-gray-500">
          {portfolio.description || "No description added."}
        </p>

        {/* Technologies */}
        {portfolio.technologies?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {portfolio.technologies.slice(0, 4).map((technology, index) => (
              <span
                key={`${technology}-${index}`}
                className="rounded-md border border-cyan-400/20 bg-cyan-400/5 px-2 py-1 text-xs text-cyan-400"
              >
                {technology}
              </span>
            ))}

            {portfolio.technologies.length > 4 && (
              <span className="px-1 py-1 text-xs text-gray-500">
                +{portfolio.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-5 flex items-center justify-between border-t border-gray-800 pt-4">
          <span className="text-xs text-gray-600">
            {new Date(portfolio.createdAt).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/dashboard/portfolios/${portfolio._id}`)}
              className="text-sm font-medium text-cyan-400 transition hover:text-cyan-300"
            >
              View →
            </button>

            <button
              onClick={() =>
                navigate(`/dashboard/portfolios/${portfolio._id}/settings`)
              }
              className="text-sm font-medium text-gray-400 transition hover:text-cyan-400"
            >
              Settings
            </button>

            <button
              onClick={handleDelete}
              disabled={deleting}
              className="text-sm font-medium text-red-400 transition hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
