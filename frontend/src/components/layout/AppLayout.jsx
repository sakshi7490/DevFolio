import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import Sidebar from "../dashboard/Sidebar";
import Navbar from "../dashboard/Navbar";

const titles = [
  { match: "/dashboard/portfolios/create", title: "Create portfolio" },
  { match: "/dashboard/portfolios/", suffix: "/edit", title: "Edit portfolio" },
  { match: "/dashboard/portfolios/", suffix: "/settings", title: "Portfolio settings" },
  { match: "/dashboard/portfolios/", title: "Portfolio" },
  { match: "/dashboard/portfolios", title: "My portfolios" },
  { match: "/profile", title: "My profile" },
  { match: "/dashboard", title: "Dashboard" },
];

const getTitle = (pathname) => {
  const found = titles.find((item) => {
    if (item.suffix) {
      return pathname.startsWith(item.match) && pathname.endsWith(item.suffix);
    }
    return pathname === item.match || pathname.startsWith(item.match);
  });

  return found?.title || "DevFolio";
};

const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="app-grid min-h-screen text-ink">
      <div className="flex min-h-screen">
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onLogout={handleLogout}
          user={user}
        />

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar
            onMenuClick={() => setSidebarOpen(true)}
            user={user}
            title={getTitle(location.pathname)}
          />
          <main className="flex-1 p-4 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
