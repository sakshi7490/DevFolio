const styles = {
  error: "border-red-200 bg-red-50 text-red-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-800",
  info: "border-stone-200 bg-stone-50 text-stone-700",
};

const Alert = ({ type = "info", children, className = "" }) => {
  if (!children) return null;

  return (
    <div
      className={`rounded-xl border px-4 py-3 text-sm ${styles[type]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Alert;
