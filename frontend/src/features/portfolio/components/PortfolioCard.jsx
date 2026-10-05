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
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="h-40 overflow-hidden bg-canvas">
        {portfolio.featuredImage ? (
          <img
            src={portfolio.featuredImage}
            alt={portfolio.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No preview image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="truncate text-lg font-semibold text-ink">
            {portfolio.title}
          </h2>
          <span
            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
              portfolio.status === "published"
                ? "bg-emerald-50 text-accent"
                : "bg-stone-100 text-stone-500"
            }`}
          >
            {portfolio.status === "published" ? "Published" : "Draft"}
          </span>
        </div>

        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {portfolio.description || "No description added."}
        </p>

        {portfolio.technologies?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {portfolio.technologies.slice(0, 4).map((technology, index) => (
              <span
                key={`${technology}-${index}`}
                className="rounded-md border border-stone-200 bg-canvas px-2 py-1 text-xs text-stone-600"
              >
                {technology}
              </span>
            ))}
            {portfolio.technologies.length > 4 && (
              <span className="px-1 py-1 text-xs text-muted">
                +{portfolio.technologies.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
          <span className="text-xs text-muted">
            {new Date(portfolio.createdAt).toLocaleDateString()}
          </span>
          <button
            onClick={() =>
              navigate(`/dashboard/portfolios/${portfolio._id}/analytics`)
            }
            className="text-sm font-medium text-accent hover:text-emerald-800"
          >
            📊 Analytics
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate(`/dashboard/portfolios/${portfolio._id}`)}
              className="text-center text-sm font-medium text-accent hover:text-emerald-800"
            >
              View
            </button>
            <button
              onClick={() =>
                navigate(`/dashboard/portfolios/${portfolio._id}/edit`)
              }
              className="text-center text-sm font-medium text-stone-600 hover:text-ink"
            >
              Edit
            </button>
            <button
              onClick={() =>
                navigate(`/dashboard/portfolios/${portfolio._id}/settings`)
              }
              className=" text-center text-sm font-medium text-stone-600 hover:text-ink"
            >
              Settings
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className=" text-center text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
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
