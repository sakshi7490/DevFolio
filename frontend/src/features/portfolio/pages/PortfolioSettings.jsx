import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";
import PageHeader from "../../../components/common/PageHeader";
import portfolioService from "../portfolioService";
import { cardClass } from "../../../styles/ui";

const PortfolioSettings = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    status: "draft",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await portfolioService.getPortfolio(id);
        const portfolio = response.data;
        setFormData({
          title: portfolio.title || "",
          slug: portfolio.slug || "",
          status: portfolio.status || "draft",
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load portfolio settings",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await portfolioService.updatePortfolioSettings(id, {
        title: formData.title.trim(),
        slug: formData.slug.trim().toLowerCase(),
        status: formData.status,
      });
      setSuccess("Portfolio settings saved successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save portfolio settings",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="h-8 w-48 animate-pulse rounded bg-white" />
        <div className="mt-8 h-96 animate-pulse rounded-2xl border border-stone-200 bg-white" />
      </div>
    );
  }

  if (error && !formData.title) {
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

  return (
    <div className="mx-auto max-w-3xl">
      <button
        onClick={() => navigate("/dashboard/portfolios")}
        className="mb-6 text-sm text-muted hover:text-accent"
      >
        ← Back to portfolios
      </button>

      <PageHeader
        eyebrow="Publishing"
        title="Portfolio settings"
        description="Manage your portfolio name, URL and publishing status."
      />

      {error && (
        <Alert type="error" className="mb-6">
          {error}
        </Alert>
      )}
      {success && (
        <Alert type="success" className="mb-6">
          {success}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className={cardClass}>
        <div className="space-y-6">
          <Input
            label="Portfolio title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="My Developer Portfolio"
            required
          />

          <div>
            <Input
              label="Portfolio slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="my-developer-portfolio"
              required
            />
            <p className="mt-1.5 text-xs text-muted">
              Use lowercase letters, numbers and hyphens only.
            </p>
          </div>

          <div>
            <label className="mb-3 block text-sm font-medium text-stone-700">
              Portfolio status
            </label>
            <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-canvas px-4 py-3">
              <div>
                <p className="text-sm font-medium text-ink">
                  {formData.status === "published" ? "Published" : "Draft"}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {formData.status === "published"
                    ? "Your portfolio is published."
                    : "Your portfolio is currently private."}
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    status: prev.status === "published" ? "draft" : "published",
                  }))
                }
                className={`relative h-6 w-11 rounded-full transition ${
                  formData.status === "published" ? "bg-accent" : "bg-stone-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                    formData.status === "published" ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-stone-100 pt-6">
            <Button type="submit" loading={saving} loadingText="Saving...">
              Save settings
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate(`/dashboard/portfolios/${id}`)}
              disabled={saving}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PortfolioSettings;
