import { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import portfolioService from "../portfolioService";

const PortfolioReview = () => {
  const { id: portfolioId } = useParams();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadReview = async () => {
    try {
      setLoading(true);

      const response = await portfolioService.reviewPortfolio(portfolioId);

      setReview(response.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to review portfolio");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (portfolioId) {
      loadReview();
    }
  }, [portfolioId]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-stone-500" />

        <p className="mt-3 text-sm font-medium text-stone-700">
          Reviewing your portfolio...
        </p>

        <p className="mt-1 text-xs text-muted">
          Analyzing your sections and generating suggestions.
        </p>
      </div>
    );
  }

  if (!review) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Score Card */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-ink">Portfolio Score</h2>

            <p className="mt-1 text-sm text-muted">
              Based on your portfolio completeness.
            </p>
          </div>

          <div className="text-right">
            <p className="text-4xl font-bold text-ink">
              {review.completionScore}%
            </p>

            <p className="mt-1 text-xs text-muted">
              {review.completedSections} of {review.totalSections} sections
              completed
            </p>
          </div>
        </div>

        <div className="mt-5 h-2 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-stone-900 transition-all"
            style={{
              width: `${review.completionScore}%`,
            }}
          />
        </div>
      </div>

      {/* Missing Sections */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-stone-600" />

          <h2 className="text-lg font-semibold text-ink">
            Missing Information
          </h2>
        </div>

        {review.missingSections.length === 0 ? (
          <div className="mt-4 flex items-center gap-2 text-sm text-stone-600">
            <CheckCircle2 className="h-5 w-5" />
            <span>All portfolio sections are completed.</span>
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {review.missingSections.map((section) => (
              <button
                key={section}
                type="button"
                onClick={() =>
                  navigate(
                    `/dashboard/portfolios/${portfolioId}/edit?section=${section}`,
                  )
                }
                className="flex w-full items-center justify-between rounded-lg border border-stone-200 bg-stone-50 p-3 text-left transition hover:bg-stone-100"
              >
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-4 w-4 text-stone-500" />

                  <span className="text-sm font-medium capitalize text-stone-700">
                    {section}
                  </span>
                </div>

                <span className="text-xs font-medium text-stone-500">
                  Complete →
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* AI Suggestions */}
      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-ink">
          AI Improvement Suggestions
        </h2>

        <p className="mt-1 text-sm text-muted">
          Suggestions to improve the quality of your portfolio.
        </p>

        <div className="mt-4 whitespace-pre-wrap rounded-xl border border-stone-200 bg-stone-50 p-4 text-sm leading-6 text-stone-700">
          {review.suggestions}
        </div>
      </div>
    </div>
  );
};

export default PortfolioReview;
