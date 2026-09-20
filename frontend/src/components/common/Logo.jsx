import { Link } from "react-router-dom";

const Logo = ({ to = "/", inverted = false }) => {
  return (
    <Link to={to} className="inline-flex items-center gap-2.5">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full ${
          inverted ? "bg-white/10 text-accent" : "bg-accent text-white"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M8 8 4 12l4 4" />
          <path d="m16 8 4 4-4 4" />
        </svg>
      </span>
      <span
        className={`text-[15px] font-semibold tracking-tight ${
          inverted ? "text-white" : "text-ink"
        }`}
      >
        devfolio
      </span>
    </Link>
  );
};

export default Logo;
