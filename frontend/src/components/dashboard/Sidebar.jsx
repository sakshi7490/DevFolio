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

const Sidebar = ({ isOpen, onClose, onLogout }) => {
  const menuItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      active: true,
    },
    {
      label: "My Profile",
      icon: UserRound,
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
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50 flex h-screen w-64 flex-col
          border-r border-white/10 bg-[#0d0f16]
          transition-transform duration-300
          lg:static lg:translate-x-0
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

          {/* Close button - mobile */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white lg:hidden"
          >
            <X size={22} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                className={`
                  flex w-full items-center gap-3 rounded-lg px-4 py-3
                  text-sm transition-all
                  ${
                    item.active
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="border-t border-white/10 p-4">
          <div className="mb-3 flex items-center gap-3 rounded-lg bg-white/5 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 font-semibold">
              S
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                User
              </p>
              <p className="truncate text-xs text-gray-500">
                user@example.com
              </p>
            </div>
          </div>

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