import { useEffect, useState } from "react";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import portfolioService from "../portfolioService";

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
      } catch (error) {
        if (error.response?.status !== 404) {
          setError(
            error.response?.data?.message || "Failed to load personal details",
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

    const response =
      await portfolioService.uploadProfileImage(
        portfolioId,
        file
      );

    console.log("Upload response:", response);

    setFormData((prev) => ({
      ...prev,
      profileImage: response.data.profileImage,
    }));

    setMessage("Profile image uploaded successfully.");
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Failed to upload profile image"
    );
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
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to save personal details",
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
        <h2 className="text-lg font-semibold text-white">Personal Details</h2>

        <p className="mt-1 text-sm text-gray-500">
          Add the basic information displayed on your portfolio.
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
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Sakshi Pal"
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
          placeholder="Kanpur, India"
        />

        <div>
          <label
            htmlFor="profileImage"
            className="mb-2 block text-sm font-medium text-gray-300"
          >
            Profile Image
          </label>

          <input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full rounded-lg border border-gray-700 bg-[#0d0e14] px-4 py-3 text-sm text-gray-400"
          />

          {formData.profileImage && (
            <img
              src={formData.profileImage}
              alt="Profile preview"
              className="mt-4 h-24 w-24 rounded-full object-cover border border-gray-700"
            />
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" loading={saving} loadingText="Saving...">
            Save Personal Details
          </Button>
        </div>
      </div>
    </form>
  );
};

export default PersonalDetailsForm;
