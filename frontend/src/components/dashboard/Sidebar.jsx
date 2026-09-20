import { useNavigate, useLocation } from "react-router-dom";
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

import Logo from "../common/Logo";

const Sidebar = ({ isOpen, onClose, onLogout, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { label: "My Profile", icon: UserRound, path: "/profile" },
    { label: "My Portfolios", icon: FolderKanban, path: "/dashboard/portfolios" },
    { label: "Projects", icon: FolderKanban },
    { label: "Experience", icon: BriefcaseBusiness },
    { label: "Education", icon: GraduationCap },
    { label: "Skills", icon: Wrench },
    { label: "Achievements", icon: Trophy },
    { label: "Settings", icon: Settings },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-stone-200 bg-white transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Logo to="/dashboard" />
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-muted transition hover:bg-stone-100 hover:text-ink lg:hidden"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path &&
              (location.pathname === item.path ||
                (item.path === "/dashboard/portfolios" &&
                  location.pathname.startsWith("/dashboard/portfolios/")) ||
                (item.path === "/dashboard" &&
                  location.pathname === "/dashboard"));

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
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-navy text-white"
                    : item.path
                      ? "text-stone-600 hover:bg-canvas hover:text-ink"
                      : "cursor-default text-stone-400"
                }`}
              >
                <Icon size={18} />
                <span className="flex-1 text-left">{item.label}</span>
                {!item.path && (
                  <span className="rounded-full bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-400">
                    Soon
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-stone-200 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-xl bg-canvas px-3 py-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-navy text-sm font-semibold text-white">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt={user.name || "Profile"}
                  className="h-full w-full object-cover"
                />
              ) : (
                user?.name?.charAt(0)?.toUpperCase() || "U"
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">
                {user?.name || "User"}
              </p>
              <p className="truncate text-xs text-muted">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm text-stone-600 transition hover:bg-red-50 hover:text-red-600"
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
