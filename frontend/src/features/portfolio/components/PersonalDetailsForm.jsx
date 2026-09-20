import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";
import portfolioService from "../portfolioService";
import { cardClass, labelClass, fieldClass } from "../../../styles/ui";

const PersonalDetailsForm = ({ portfolioId }) => {
  const [formData, setFormData] = useState({
    name: "",
    headline: "",
    location: "",
    profileImage: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        setLoading(true);
        const response = await portfolioService.getPersonal(portfolioId);
        if (response.data) {
          setFormData({
            name: response.data.name || "",
            headline: response.data.headline || "",
            location: response.data.location || "",
            profileImage: response.data.profileImage || "",
          });
        }
      } catch (err) {
        if (err.response?.status !== 404) {
          setError(
            err.response?.data?.message || "Failed to load personal details",
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalDetails();
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setSaving(true);
      setMessage("");
      setError("");
      const response = await portfolioService.uploadProfileImage(
        portfolioId,
        file,
      );
      setFormData((prev) => ({
        ...prev,
        profileImage: response.data.profileImage,
      }));
      setMessage("Profile image uploaded successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to upload profile image");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");
      await portfolioService.updatePersonal(portfolioId, formData);
      setMessage("Personal details saved successfully.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save personal details");
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
        <h2 className="text-lg font-semibold text-ink">Personal details</h2>
        <p className="mt-1 text-sm text-muted">
          Add the basic information displayed on your portfolio.
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
        <Input
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your name"
        />
        <Input
          label="Headline"
          name="headline"
          value={formData.headline}
          onChange={handleChange}
          placeholder="Backend / Software Developer"
        />
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="City, Country"
        />

        <div>
          <label htmlFor="profileImage" className={labelClass}>
            Profile image
          </label>
          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={fieldClass}
          />
          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile preview"
              className="mt-4 h-24 w-24 rounded-full border border-stone-200 object-cover"
            />
          )}
        </div>

        <Button type="submit" loading={saving} loadingText="Saving...">
          Save personal details
        </Button>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
