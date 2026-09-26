import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";
import portfolioService from "../portfolioService";
import { cardClass, fieldClass, labelClass } from "../../../styles/ui";

const AboutForm = ({ portfolioId, onDirtyChange }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await portfolioService.getAbout(portfolioId);
        if (response.data) {
          setContent(response.data.content || "");
        }
      } catch (err) {
        if (err.response?.status !== 404) {
          setError(
            err.response?.data?.message || "Failed to load About section",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, [portfolioId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");
      await portfolioService.updateAbout(portfolioId, { content });
      onDirtyChange?.(false);
      setMessage("About section saved successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save About section");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-80 animate-pulse rounded-2xl border border-stone-200 bg-white" />
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cardClass}>
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-ink">About</h2>
        <p className="mt-1 text-sm text-muted">
          Tell visitors about yourself, your background, and what you do.
        </p>
      </div>

      {error && (
        <Alert type="error" className="mb-5">
          {error}
        </Alert>
      )}
      {message && (
        <Alert type="success" className="mb-5">
          {message}
        </Alert>
      )}

      <div className="space-y-5">
        <div>
          <label htmlFor="about-content" className={labelClass}>
            About me
          </label>
          <textarea
            id="about-content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              onDirtyChange?.(true);
              setMessage("");
              setError("");
            }}
            placeholder="Write something about yourself..."
            rows={8}
            maxLength={2000}
            className={`${fieldClass} resize-y`}
          />
          <div className="mt-1.5 text-right text-xs text-muted">
            {content.length}/2000
          </div>
        </div>

        <Button type="submit" loading={saving} loadingText="Saving...">
          Save about
        </Button>
      </div>
    </form>
  );
};

export default AboutForm;
