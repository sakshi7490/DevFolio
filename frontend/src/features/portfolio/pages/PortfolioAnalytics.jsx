import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import portfolioService from "../portfolioService";
import PageHeader from "../../../components/common/PageHeader";
import Alert from "../../../components/common/Alert";
import { cardClass } from "../../../styles/ui";

const PortfolioAnalytics = () => {
  const { id } = useParams();

  const [analytics, setAnalytics] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await portfolioService.getAnalyticsSummary(
        id,
        startDate,
        endDate,
      );

      setAnalytics(response.data);
      console.log("Analytics response:", response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load analytics");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [id]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchAnalytics();
  };

  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader
        eyebrow="Insights"
        title="Portfolio analytics"
        description="Track how visitors interact with your portfolio."
      />

      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}

      <form
        onSubmit={handleFilter}
        className={`${cardClass} mb-6 flex flex-wrap items-end gap-4`}
      >
        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            From
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="rounded-xl border border-stone-200 px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-stone-700">
            To
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="rounded-xl border border-stone-200 px-3 py-2.5 text-sm"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-medium text-white"
        >
          Apply
        </button>
      </form>

      {loading ? (
        <div className={cardClass}>
          <p className="text-sm text-stone-500">Loading analytics...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className={cardClass}>
            <p className="text-sm text-stone-500">Total Views</p>
            <p className="mt-2 text-3xl font-semibold text-stone-900">
              {analytics?.totalViews || 0}
            </p>
          </div>

          <div className={cardClass}>
            <p className="text-sm text-stone-500">Unique Visitors</p>
            <p className="mt-2 text-3xl font-semibold text-stone-900">
              {analytics?.uniqueVisitors || 0}
            </p>
          </div>

          <div className={cardClass}>
            <p className="text-sm text-stone-500">Resume Downloads</p>
            <p className="mt-2 text-3xl font-semibold text-stone-900">
              {analytics?.resumeDownloads || 0}
            </p>
          </div>
          {analytics?.dailyAnalytics?.length > 0 && (
            <div className={`${cardClass} mt-6 md:col-span-3`}>
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-stone-900">
                  Portfolio activity
                </h2>
                <p className="text-sm text-stone-500">
                  Views and resume downloads over time.
                </p>
              </div>

              <div className="space-y-6">
                {(() => {
                  const maxValue = Math.max(
                    ...analytics.dailyAnalytics.map((day) =>
                      Math.max(day.views, day.downloads),
                    ),
                    1,
                  );

                  return analytics.dailyAnalytics.map((item) => (
                    <div key={item.date}>
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-stone-700">
                          {item.date}
                        </span>

                        <span className="text-xs text-stone-500">
                          {item.views} views · {item.downloads} downloads
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="w-20 text-xs text-stone-500">
                            Views
                          </span>

                          <div className="h-2 flex-1 rounded-full bg-stone-100">
                            <div
                              className="h-2 rounded-full bg-stone-900"
                              style={{
                                width: `${(item.views / maxValue) * 100}%`,
                              }}
                            />
                          </div>

                          <span className="w-8 text-right text-xs text-stone-600">
                            {item.views}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="w-20 text-xs text-stone-500">
                            Downloads
                          </span>

                          <div className="h-2 flex-1 rounded-full bg-stone-100">
                            <div
                              className="h-2 rounded-full bg-stone-300"
                              style={{
                                width: `${(item.downloads / maxValue) * 100}%`,
                              }}
                            />
                          </div>

                          <span className="w-8 text-right text-xs text-stone-600">
                            {item.downloads}
                          </span>
                        </div>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioAnalytics;
