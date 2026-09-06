import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

import { getProfile, updateProfile } from "../services/user.service";

const Profile = () => {
  const navigate = useNavigate();

  const { updateUser } = useAuth();

  const [profile, setProfile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    githubUsername: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // =========================
  // Get Profile
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await getProfile();

        const user = response.data;

        setProfile(user);

        setFormData({
          name: user.name || "",
          githubUsername: user.githubUsername || "",
          profileImage: user.profileImage || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);

        setError(
          error.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =========================
  // Handle Input
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // Update Profile
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const response = await updateProfile(formData);

      setProfile(response.data);
      updateUser(response.data);

      setFormData({
        name: response.data.name || "",
        githubUsername: response.data.githubUsername || "",
        profileImage: response.data.profileImage || "",
      });

      setSuccess("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);

      setError(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================
  // Loading
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14151c] text-white">
        Loading profile...
      </div>
    );
  }

  // =========================
  // Error
  // =========================
  if (error && !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14151c] text-white">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14151c] px-4 py-8 text-white lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/dashboard")}
            className="mb-4 text-sm text-gray-400 hover:text-white"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-gray-400">
            View and update your profile information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="rounded-2xl border border-white/10 bg-[#191a23] p-6 shadow-xl">

          {/* Profile Image */}
          <div className="mb-8 flex items-center gap-5">

            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 text-2xl font-bold">
              {formData.profileImage ? (
                <img
                  src={formData.profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                formData.name?.charAt(0)?.toUpperCase() || "U"
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                {profile?.name || "User"}
              </h2>

              <p className="text-sm text-gray-400">
                {profile?.email}
              </p>
            </div>

          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full rounded-lg border border-white/10 bg-[#111219] px-4 py-3 text-white outline-none transition focus:border-purple-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email
              </label>

              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-white/10 bg-[#111219] px-4 py-3 text-gray-500"
              />

              <p className="mt-1 text-xs text-gray-500">
                Email cannot be changed.
              </p>
            </div>

            {/* GitHub */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                GitHub Username
              </label>

              <input
                type="text"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleChange}
                placeholder="e.g. Sanya-Kanojiya"
                className="w-full rounded-lg border border-white/10 bg-[#111219] px-4 py-3 text-white outline-none transition focus:border-purple-500"
              />
            </div>

            {/* Profile Image */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Profile Image URL
              </label>

              <input
                type="text"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                placeholder="https://example.com/profile.jpg"
                className="w-full rounded-lg border border-white/10 bg-[#111219] px-4 py-3 text-white outline-none transition focus:border-purple-500"
              />
            </div>

            {/* Messages */}
            {error && (
              <p className="text-sm text-red-400">
                {error}
              </p>
            )}

            {success && (
              <p className="text-sm text-green-400">
                {success}
              </p>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-3">

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="rounded-lg border border-white/20 px-5 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};

export default Profile;