import { Menu } from "lucide-react";

const Navbar = ({ onMenuClick, user, title = "Dashboard" }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200/80 bg-white/85 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted transition hover:bg-canvas hover:text-ink lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-base font-semibold text-ink">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-ink">{user?.name || "User"}</p>
          <p className="text-xs text-muted">{user?.email}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-navy text-sm font-semibold text-white">
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
