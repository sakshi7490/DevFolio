import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, UserRound } from "lucide-react";

import useAuth from "../hooks/useAuth";
import { getProfile } from "../services/user.service";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import Button from "../components/common/Button";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getProfile();
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return <Spinner label="Loading profile..." />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md pt-16 text-center">
        <Alert type="error">{error}</Alert>
        <Button onClick={handleLogout} className="mt-4">
          Go to login
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <WelcomeSection user={profile} />

      <div className="grid gap-4 sm:grid-cols-2">
        <button
          onClick={() => navigate("/dashboard/portfolios")}
          className="rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:border-accent/40"
        >
          <FolderKanban className="mb-3 text-accent" size={22} />
          <h3 className="font-semibold text-ink">Portfolios</h3>
          <p className="mt-1 text-sm text-muted">
            Create, edit, and publish the work you want the world to see.
          </p>
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm transition hover:border-accent/40"
        >
          <UserRound className="mb-3 text-accent" size={22} />
          <h3 className="font-semibold text-ink">Account profile</h3>
          <p className="mt-1 text-sm text-muted">
            Keep your name and account details current.
          </p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
