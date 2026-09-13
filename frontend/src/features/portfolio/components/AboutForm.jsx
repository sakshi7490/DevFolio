import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import portfolioService from "../portfolioService";

const AboutForm = ({ portfolioId }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);

        const response =
          await portfolioService.getAbout(portfolioId);

        if (response.data) {
          setContent(response.data.content || "");
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          setError(
            error.response?.data?.message ||
              "Failed to load About section"
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

      await portfolioService.updateAbout(portfolioId, {
        content,
      });

      setMessage("About section saved successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save About section"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-80 animate-pulse rounded-xl border border-gray-800 bg-[#0d0e14]" />
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-gray-800 bg-[#0d0e14] p-6 md:p-8"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white">
          About
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Tell visitors about yourself, your background, and what you do.
        </p>
      </div>

      {error && (
        <div className="mb-5 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {message && (
        <div className="mb-5 rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
          {message}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label
            htmlFor="about-content"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            About Me
          </label>

          <textarea
            id="about-content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setMessage("");
              setError("");
            }}
            placeholder="Write something about yourself..."
            rows={8}
            maxLength={2000}
            className="w-full resize-y rounded-lg border border-gray-700 bg-[#0d0e14] px-4 py-3 text-sm text-white placeholder:text-gray-600 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/10"
          />

          <div className="mt-1.5 text-right text-xs text-gray-600">
            {content.length}/2000
          </div>
        </div>

        <Button
          type="submit"
          loading={saving}
          loadingText="Saving..."
        >
          Save About
        </Button>
      </div>
    </form>
  );
};

export default AboutForm;