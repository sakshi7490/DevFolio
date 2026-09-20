import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { getProfile, updateProfile } from "../services/user.service";
import Input from "../components/common/Input";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";
import Spinner from "../components/common/Spinner";
import PageHeader from "../components/common/PageHeader";
import { cardClass } from "../styles/ui";

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
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner label="Loading profile..." />;
  }

  if (error && !profile) {
    return <Alert type="error">{error}</Alert>;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader
        eyebrow="Account"
        title="My profile"
        description="View and update your profile information."
      />

      <div className={cardClass}>
        <div className="mb-8 flex items-center gap-5">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-navy text-2xl font-bold text-white">
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
            <h2 className="text-xl font-semibold text-ink">
              {profile?.name || "User"}
            </h2>
            <p className="text-sm text-muted">{profile?.email}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Full name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={profile?.email || ""}
            onChange={() => {}}
            disabled
          />
          <p className="-mt-3 text-xs text-muted">Email cannot be changed.</p>

          <Input
            label="GitHub username"
            name="githubUsername"
            value={formData.githubUsername}
            onChange={handleChange}
            placeholder="e.g. your-handle"
          />

          <Input
            label="Profile image URL"
            name="profileImage"
            value={formData.profileImage}
            onChange={handleChange}
            placeholder="https://example.com/profile.jpg"
          />

          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">{success}</Alert>}

          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </Button>
            <Button type="submit" loading={saving} loadingText="Saving...">
              Save changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
