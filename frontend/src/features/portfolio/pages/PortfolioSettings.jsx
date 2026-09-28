import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";
import PageHeader from "../../../components/common/PageHeader";
import portfolioService from "../portfolioService";
import { cardClass } from "../../../styles/ui";
import TemplateSelector from "../components/TemplateSelector";

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
  const [selectedTemplate, setSelectedTemplate] = useState("minimal");
  const [themeColor, setThemeColor] = useState("orange");
  const [font, setFont] = useState("inter");
  const [themeMode, setThemeMode] = useState("dark");

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

        setSelectedTemplate(portfolio.template || "minimal");
        setThemeColor(portfolio.themeColor || "orange");
        setFont(portfolio.font || "inter");
        setThemeMode(portfolio.themeMode || "dark");
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
        template: selectedTemplate,
        themeColor: themeColor,
        font: font,
        themeMode: themeMode,
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

      <form onSubmit={handleSubmit} className={cardClass}>
        <div className="space-y-6">
          {/* Portfolio title */}
          <Input
            label="Portfolio title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="My Developer Portfolio"
            required
          />

          {/* Portfolio slug */}
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

          {/* Portfolio status */}
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

          {/* Portfolio template */}
          <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-emerald-100/50 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 -left-16 h-36 w-36 rounded-full bg-emerald-50/70 blur-3xl" />

            <div className="relative">
              <div className="mb-5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-accent" />

                  <h2 className="font-display text-xl font-medium text-ink">
                    Portfolio Template
                  </h2>
                </div>

                <p className="mt-1 pl-4 text-sm text-muted">
                  Choose how your public portfolio looks.
                </p>
              </div>

              <TemplateSelector
                selectedTemplate={selectedTemplate}
                onSelect={(template) => {
                  setSelectedTemplate(template);
                  setSuccess("");
                }}
              />

              <div className="mt-8">
                <h2 className="font-display text-xl font-medium text-ink">
                  Theme Color
                </h2>

                <div className="mt-4 flex flex-wrap gap-3">
                  {["orange", "blue", "green", "purple", "red"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setThemeColor(color)}
                      className={`h-10 w-10 rounded-full border-2 ${
                        themeColor === color
                          ? "border-ink ring-2 ring-ink/10"
                          : "border-transparent"
                      }`}
                      style={{
                        backgroundColor: color,
                      }}
                      aria-label={`Select ${color} theme`}
                    />
                  ))}
                </div>
              </div>

              <div className="mt-8">
                <h2 className="font-display text-xl font-medium text-ink">
                  Theme Mode
                </h2>

                <p className="mt-1 text-sm text-muted">
                  Choose the appearance of your public portfolio.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      id: "light",
                      name: "Light",
                      description: "Clean and bright",
                    },
                    {
                      id: "dark",
                      name: "Dark",
                      description: "Elegant and immersive",
                    },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setThemeMode(option.id);
                        setSuccess("");
                      }}
                      className={`rounded-xl border px-4 py-4 text-left transition ${
                        themeMode === option.id
                          ? "border-ink bg-stone-50 ring-2 ring-ink/10"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full border ${
                            option.id === "light"
                              ? "border-stone-300 bg-white"
                              : "border-stone-700 bg-stone-900"
                          }`}
                        />

                        <div>
                          <p className="font-medium text-ink">{option.name}</p>

                          <p className="mt-1 text-sm text-muted">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-8">
                <h2 className="font-display text-xl font-medium text-ink">
                  Font Style
                </h2>

                <p className="mt-1 text-sm text-muted">
                  Choose the font style for your public portfolio.
                </p>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    { id: "inter", name: "Inter", className: "font-sans" },
                    {
                      id: "poppins",
                      name: "Poppins",
                      className: "font-display",
                    },
                    { id: "serif", name: "Serif", className: "font-serif" },
                    { id: "mono", name: "Monospace", className: "font-mono" },
                  ].map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        setFont(option.id);
                        setSuccess("");
                      }}
                      className={`rounded-xl border px-4 py-4 text-left transition ${
                        font === option.id
                          ? "border-ink bg-stone-50 ring-2 ring-ink/10"
                          : "border-stone-200 hover:border-stone-400"
                      }`}
                    >
                      <p className={`text-lg font-medium ${option.className}`}>
                        {option.name}
                      </p>

                      <p
                        className={`mt-1 text-sm text-muted ${option.className}`}
                      >
                        Aa Bb Cc 123
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Success message */}
          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </div>
          )}

          {/* Actions */}
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
