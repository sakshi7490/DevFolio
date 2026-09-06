import { Menu, Search, Bell } from "lucide-react";

const Navbar = ({ onMenuClick, user }) => {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#0d0f16] px-4 lg:px-8">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          <Menu size={22} />
        </button>

        <h1 className="text-lg font-semibold text-white">
          Dashboard
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <button className="hidden rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white sm:block">
          <Search size={20} />
        </button>

        {/* Notification */}
        <button className="rounded-lg p-2 text-gray-400 transition hover:bg-white/5 hover:text-white">
          <Bell size={20} />
        </button>

        {/* Profile */}
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 font-semibold text-white">
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
      </div>
    </header>
  );
};

export default Navbar;