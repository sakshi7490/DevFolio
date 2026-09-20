import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import portfolioService from "../portfolioService";
import PortfolioCard from "../components/PortfolioCard";
import PageHeader from "../../../components/common/PageHeader";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";
import EmptyState from "../../../components/common/EmptyState";

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
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load portfolios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolios();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <PageHeader
        eyebrow="Workspace"
        title="My portfolios"
        description="Manage your developer portfolios."
        actions={
          <Button onClick={() => navigate("/dashboard/portfolios/create")}>
            Create portfolio
          </Button>
        }
      />

      {loading && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-2xl border border-stone-200 bg-white"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="space-y-4">
          <Alert type="error">{error}</Alert>
          <Button variant="secondary" onClick={fetchPortfolios}>
            Try again
          </Button>
        </div>
      )}

      {!loading && !error && portfolios.length === 0 && (
        <EmptyState
          title="No portfolios yet"
          description="Create your first portfolio to get started."
          action={
            <Button onClick={() => navigate("/dashboard/portfolios/create")}>
              Create portfolio
            </Button>
          }
        />
      )}

      {!loading && !error && portfolios.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio._id}
              portfolio={portfolio}
              onDelete={(deletedId) => {
                setPortfolios((prev) =>
                  prev.filter((item) => item._id !== deletedId),
                );
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
