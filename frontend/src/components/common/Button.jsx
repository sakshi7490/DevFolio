const variants = {
  primary:
    "bg-accent text-white shadow-sm hover:bg-emerald-700 disabled:hover:bg-accent",
  secondary:
    "border border-stone-200 bg-white text-stone-700 hover:bg-stone-50",
  ghost: "text-stone-600 hover:bg-stone-100",
  danger: "bg-red-600 text-white hover:bg-red-700",
};

const Button = ({
  children,
  type = "button",
  onClick,
  loading = false,
  loadingText = "Please wait...",
  disabled = false,
  className = "",
  variant = "primary",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] || variants.primary} ${className}`}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
