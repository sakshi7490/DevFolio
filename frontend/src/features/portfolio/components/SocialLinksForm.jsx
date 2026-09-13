import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import portfolioService from "../portfolioService";

const SocialLinksForm = ({ portfolioId }) => {
  const [formData, setFormData] = useState({
    github: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    website: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        setLoading(true);

        const response =
          await portfolioService.getSocial(portfolioId);

        if (response.data) {
          setFormData({
            github: response.data.github || "",
            linkedin: response.data.linkedin || "",
            twitter: response.data.twitter || "",
            instagram: response.data.instagram || "",
            website: response.data.website || "",
          });
        }
      } catch (error) {
        if (error.response?.status !== 404) {
          setError(
            error.response?.data?.message ||
              "Failed to load social links"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSocialLinks();
  }, [portfolioId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      await portfolioService.updateSocial(
        portfolioId,
        formData
      );

      setMessage("Social links saved successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to save social links"
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
          Social Links
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add links to your social profiles and website.
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
        <Input
          label="GitHub"
          name="github"
          type="url"
          value={formData.github}
          onChange={handleChange}
          placeholder="https://github.com/username"
        />

        <Input
          label="LinkedIn"
          name="linkedin"
          type="url"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="https://linkedin.com/in/username"
        />

        <Input
          label="Twitter / X"
          name="twitter"
          type="url"
          value={formData.twitter}
          onChange={handleChange}
          placeholder="https://x.com/username"
        />

        <Input
          label="Instagram"
          name="instagram"
          type="url"
          value={formData.instagram}
          onChange={handleChange}
          placeholder="https://instagram.com/username"
        />

        <Input
          label="Website"
          name="website"
          type="url"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://yourwebsite.com"
        />

        <Button
          type="submit"
          loading={saving}
          loadingText="Saving..."
        >
          Save Social Links
        </Button>
      </div>
    </form>
  );
};

export default SocialLinksForm;