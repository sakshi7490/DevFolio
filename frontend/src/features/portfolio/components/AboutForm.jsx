import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import toast from "react-hot-toast";
import Alert from "../../../components/common/Alert";
import portfolioService from "../portfolioService";
import { cardClass, fieldClass, labelClass } from "../../../styles/ui";

const AboutForm = ({ portfolioId, onDirtyChange }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [improving, setImproving] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState("");
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

  const handleGenerateWithAI = async () => {
    try {
      setGenerating(true);
      setMessage("");
      setError("");

      const response = await portfolioService.generateAbout({
        content,
      });

      setAiSuggestion(response.data.content);

      toast.success("About Me content generated successfully.");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to generate About Me content",
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleImproveContent = async () => {
    if (!content.trim()) {
      toast.error("Please write some content first.");
      return;
    }

    try {
      setImproving(true);
      setMessage("");
      setError("");

      const response = await portfolioService.improveGrammar({
        content,
      });

      setAiSuggestion(response.data.content);

      toast.success("Content improved successfully.");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to improve content");
    } finally {
      setImproving(false);
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

          <div className="mt-2 mb-3">
            <Button
              type="button"
              variant="secondary"
              loading={generating}
              loadingText="Generating..."
              onClick={handleGenerateWithAI}
            >
              Generate with AI
            </Button>

            <Button
              type="button"
              variant="secondary"
              loading={improving}
              loadingText="Improving..."
              onClick={handleImproveContent}
            >
              Improve content
            </Button>
          </div>

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

          {aiSuggestion && (
            <div className="rounded-xl border border-stone-200 bg-stone-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-semibold text-ink">
                    AI Suggestion
                  </h3>
                  <p className="mt-1 text-xs text-muted">
                    Review the suggestion before applying it.
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-lg border border-stone-200 bg-white p-4">
                <p className="whitespace-pre-wrap text-sm leading-6 text-stone-700">
                  {aiSuggestion}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  type="button"
                  onClick={() => {
                    setContent(aiSuggestion);
                    setAiSuggestion("");
                    onDirtyChange?.(true);
                    toast.success("AI suggestion applied.");
                  }}
                >
                  Accept
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setAiSuggestion("")}
                >
                  Reject
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  loading={generating || improving}
                  onClick={handleGenerateWithAI}
                >
                  Regenerate
                </Button>
              </div>
            </div>
          )}
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
