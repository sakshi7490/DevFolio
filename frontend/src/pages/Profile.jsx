import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, User, Image as ImageIcon } from "lucide-react";
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
        const user = response.data.user;
        setProfile(user);
        setFormData({
          name: user.name || "",
          githubUsername: user.socialLinks?.github || "",
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

      const payload = {
        name: formData.name,
        profileImage: formData.profileImage,
        socialLinks: {
          ...(profile?.socialLinks || {}),
          github: formData.githubUsername,
        },
      };

      const response = await updateProfile(payload);

      const updatedUser = response.data.user;

      setProfile(updatedUser);
      updateUser(updatedUser);

      setFormData({
        name: updatedUser.name || "",
        githubUsername: updatedUser.socialLinks?.github || "",
        profileImage: updatedUser.profileImage || "",
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
    <div className="mx-auto max-w-4xl">
      <PageHeader
        eyebrow="Account"
        title="My profile"
        description="Manage your personal information and profile details."
      />

      <div className={`${cardClass} overflow-hidden p-0`}>
        {/* Profile hero */}
        <div className="relative border-b border-stone-200 bg-gradient-to-br from-emerald-50 via-white to-stone-50 px-6 py-7 sm:px-8">
          <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-emerald-100/40 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-navy text-3xl font-bold text-white shadow-md">
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

            <div className="min-w-0">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Profile
              </p>

              <h2 className="truncate text-2xl font-semibold text-ink">
                {profile?.name || "User"}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-muted">
                <Mail className="h-4 w-4" />
                <span className="truncate">{profile?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          {/* Personal information */}
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-accent">
                <User className="h-4 w-4" />
              </div>

              <div>
                <h3 className="text-sm font-semibold text-ink">
                  Personal information
                </h3>
                <p className="mt-0.5 text-xs text-muted">
                  Basic information associated with your account.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Input
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />

              <div>
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={profile?.email || ""}
                  onChange={() => {}}
                  disabled
                />
                <p className="mt-2 text-xs text-muted">
                  Your email address cannot be changed.
                </p>
              </div>
            </div>
          </div>

          {/* Profile details */}
          <div className="border-t border-stone-200 pt-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-accent">
                <span className="text-sm font-bold">GH</span>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-ink">
                  Profile details
                </h3>
                <p className="mt-0.5 text-xs text-muted">
                  Add information that can be displayed on your portfolio.
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <Input
                label="GitHub profile URL"
                name="githubUsername"
                value={formData.githubUsername}
                onChange={handleChange}
                placeholder="https://github.com/your-username"
              />

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-muted" />
                  <span className="text-sm font-medium text-ink">
                    Profile image URL
                  </span>
                </div>

                <Input
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="https://example.com/profile.jpg"
                />

                <p className="mt-2 text-xs text-muted">
                  Use a publicly accessible image URL for your profile photo.
                </p>
              </div>
            </div>
          </div>

          {/* Feedback */}
          {(error || success) && (
            <div className="mt-7">
              {error && <Alert type="error">{error}</Alert>}
              {success && <Alert type="success">{success}</Alert>}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
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
