const Spinner = ({ label = "Loading..." }) => {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-200 border-t-accent" />
      <p className="text-sm">{label}</p>
    </div>
  );
};

export default Spinner;
