import { useLocation, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  UserRound,
  FolderKanban,
  BriefcaseBusiness,
  GraduationCap,
  Wrench,
  Trophy,
  Settings,
  LogOut,
  X,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose, onLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      label: "My Profile",
      icon: UserRound,
      path: "/profile",
    },
    {
      label: "My Portfolios",
      icon: FolderKanban,
      path: "/dashboard/portfolios",
    },
    {
      label: "Projects",
      icon: FolderKanban,
    },
    {
      label: "Experience",
      icon: BriefcaseBusiness,
    },
    {
      label: "Education",
      icon: GraduationCap,
    },
    {
      label: "Skills",
      icon: Wrench,
    },
    {
      label: "Achievements",
      icon: Trophy,
    },
    {
      label: "Settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          border-r border-white/10 bg-[#0d0f16]
          shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">
              <span className="text-lg font-bold">D</span>
            </div>

            <span className="text-lg font-bold tracking-wide text-white">
              DEVFOLIO
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            const isActive =
              item.path &&
              (location.pathname === item.path ||
                (item.path === "/dashboard/portfolios" &&
                  location.pathname.startsWith(
                    "/dashboard/portfolios/"
                  )));

            return (
              <button
                key={item.label}
                onClick={() => {
                  if (item.path) {
                    navigate(item.path);
                    onClose();
                  }
                }}
                disabled={!item.path}
                className={`
                  flex w-full items-center gap-3 rounded-lg px-4 py-3
                  text-sm transition-all
                  ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                      : item.path
                      ? "text-gray-400 hover:bg-white/5 hover:text-white"
                      : "cursor-default text-gray-500"
                  }
                `}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 font-semibold">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {user?.name || "User"}
              </p>

              <p className="truncate text-xs text-gray-500">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;