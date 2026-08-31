import { useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import WelcomeSection from "../components/dashboard/WelcomeSection";

const Dashboard = () => {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Close sidebar on mobile
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  // Open sidebar on mobile
  const handleOpenSidebar = () => {
    setSidebarOpen(true);
  };

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
            user={user}
          />

          {/* =========================
              Dashboard Content
          ========================= */}
          <main className="flex-1 p-4 lg:p-8">

            {/* Welcome Section */}
            <WelcomeSection user={user} />

          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;