const EmptyState = ({ title, description, action }) => {
  return (
    <div className="rounded-2xl border border-dashed border-stone-300 bg-white/70 px-6 py-16 text-center">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {description && (
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

export default EmptyState;
