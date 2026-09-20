import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import portfolioService from "../portfolioService";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";
import { cardClass } from "../../../styles/ui";

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
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [id]);

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl">
        <div className="h-72 animate-pulse rounded-2xl border border-stone-200 bg-white" />
        <div className="mt-6 space-y-4">
          <div className="h-8 w-1/2 animate-pulse rounded bg-white" />
          <div className="h-20 animate-pulse rounded bg-white" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg pt-10 text-center">
        <Alert type="error">{error}</Alert>
        <Button
          variant="secondary"
          className="mt-5"
          onClick={() => navigate("/dashboard/portfolios")}
        >
          Back to portfolios
        </Button>
      </div>
    );
  }

  if (!portfolio) {
    return null;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <button
        onClick={() => navigate("/dashboard/portfolios")}
        className="mb-6 text-sm text-muted transition hover:text-accent"
      >
        ← Back to portfolios
      </button>

      <div className={`overflow-hidden ${cardClass} p-0 sm:p-0`}>
        {portfolio.featuredImage && (
          <div className="h-72 overflow-hidden bg-canvas">
            <img
              src={portfolio.featuredImage}
              alt={portfolio.title}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="p-6 md:p-8">
          <h1 className="font-display text-3xl font-medium text-ink">
            {portfolio.title}
          </h1>
          <p className="mt-2 text-sm text-muted">
            Created on {new Date(portfolio.createdAt).toLocaleDateString()}
          </p>

          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              About
            </h2>
            <p className="mt-3 leading-7 text-stone-700">
              {portfolio.description || "No description added."}
            </p>
          </div>

          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
              Technologies
            </h2>
            {portfolio.technologies?.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {portfolio.technologies.map((technology, index) => (
                  <span
                    key={`${technology}-${index}`}
                    className="rounded-md border border-stone-200 bg-canvas px-3 py-1.5 text-sm text-stone-700"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-muted">No technologies added.</p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 border-t border-stone-100 pt-6">
            {portfolio.liveUrl && (
              <a
                href={portfolio.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>View live</Button>
              </a>
            )}
            {portfolio.githubUrl && (
              <a
                href={portfolio.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary">GitHub</Button>
              </a>
            )}
            <Button
              variant="ghost"
              onClick={() => navigate("/dashboard/portfolios")}
            >
              Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
