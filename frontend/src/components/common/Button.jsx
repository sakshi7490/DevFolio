const Button = ({
  children,
  type = "button",
  onClick,
  loading = false,
  loadingText = "Please wait...",
  disabled = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        w-full
        rounded-xl
        px-4
        py-3
        text-white
        font-semibold
        bg-gradient-to-r
        from-cyan-500
        to-purple-600
        shadow-lg
        shadow-purple-500/20
        transition-all
        duration-200
        hover:from-cyan-400
        hover:to-purple-500
        hover:shadow-purple-500/30
        hover:-translate-y-[1px]
        active:translate-y-0
        disabled:cursor-not-allowed
        disabled:opacity-60
        disabled:hover:translate-y-0
        ${className}
      `}
    >
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;