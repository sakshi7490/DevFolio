import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import { getProfile } from "../services/user.service";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import WelcomeSection from "../components/dashboard/WelcomeSection";


const Dashboard = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // =========================
  // Fetch User Profile
  // =========================
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProfile();

        setProfile(response.data);
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
  // Handle Logout
  // =========================
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // =========================
  // Mobile Sidebar
  // =========================
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

  // =========================
  // Loading State
  // =========================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14151c] text-white">
        <p className="text-gray-400">
          Loading profile...
        </p>
      </div>
    );
  }

  // =========================
  // Error State
  // =========================
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#14151c] text-white">
        <div className="text-center">
          <p className="mb-4 text-red-400">
            {error}
          </p>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-2 text-sm font-medium text-white transition hover:opacity-90"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#14151c] text-white">
      <div className="flex min-h-screen">

        {/* =========================
            Sidebar
        ========================= */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={handleCloseSidebar}
          onLogout={handleLogout}
          user={profile}
        />

        {/* =========================
            Main Content Area
        ========================= */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* =========================
              Navbar
          ========================= */}
          <Navbar
            onMenuClick={handleOpenSidebar}
            user={profile}
          />

          {/* =========================
              Dashboard Content
          ========================= */}
          <main className="flex-1 p-4 lg:p-8">

            {/* Welcome Section */}
            <WelcomeSection user={profile} />

          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;