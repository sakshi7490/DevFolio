import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import portfolioService from "../portfolioService";

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
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load portfolio settings"
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
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save portfolio settings"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-[#08090d] p-6">
        <div className="mx-auto max-w-3xl">
          <div className="h-8 w-48 animate-pulse rounded bg-[#0d0e14]" />
          <div className="mt-8 h-96 animate-pulse rounded-xl border border-gray-800 bg-[#0d0e14]" />
        </div>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="flex min-h-full items-center justify-center bg-[#08090d] p-6">
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">
          <h2 className="text-lg font-medium text-white">
            Unable to load settings
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

  return (
    <div className="min-h-full bg-[#08090d] p-6">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate("/dashboard/portfolios")}
          className="mb-6 text-sm text-gray-500 transition hover:text-cyan-400"
        >
          ← Back to Portfolios
        </button>

        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            Portfolio Settings
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your portfolio name, URL and publishing status.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-6 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
            {success}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-800 bg-[#0d0e14] p-6 md:p-8"
        >
          <div className="space-y-6">
            <Input
              label="Portfolio Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="My Developer Portfolio"
              required
            />

            <div>
              <Input
                label="Portfolio Slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="my-developer-portfolio"
                required
              />

              <p className="mt-1.5 text-xs text-gray-500">
                Use lowercase letters, numbers and hyphens only.
              </p>
            </div>

            <div>
              <label className="mb-3 block text-sm font-medium text-gray-300">
                Portfolio Status
              </label>

              <div className="flex items-center justify-between rounded-lg border border-gray-700 bg-[#08090d] px-4 py-3">
                <div>
                  <p className="text-sm font-medium text-white">
                    {formData.status === "published"
                      ? "Published"
                      : "Draft"}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
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
                      status:
                        prev.status === "published"
                          ? "draft"
                          : "published",
                    }))
                  }
                  className={`relative h-6 w-11 rounded-full transition ${
                    formData.status === "published"
                      ? "bg-cyan-500"
                      : "bg-gray-700"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      formData.status === "published"
                        ? "left-6"
                        : "left-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="flex gap-3 border-t border-gray-800 pt-6">
              <Button
                type="submit"
                loading={saving}
                loadingText="Saving..."
              >
                Save Settings
              </Button>

              <Button
                type="button"
                onClick={() =>
                  navigate(`/dashboard/portfolios/${id}`)
                }
                disabled={saving}
                className="border border-gray-700 bg-transparent text-gray-300 hover:border-cyan-400 hover:bg-transparent hover:text-cyan-400"
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PortfolioSettings;