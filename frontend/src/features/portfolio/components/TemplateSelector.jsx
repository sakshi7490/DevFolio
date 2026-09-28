import templateConfig from "../templates/templateConfig";

const TemplateSelector = ({ selectedTemplate, onSelect }) => {
  const previewStyles = {
    minimal: {
      container: "bg-white",
      header: "bg-stone-100",
      accent: "bg-stone-800",
      lines: "bg-stone-200",
    },
    professional: {
      container: "bg-white",
      header: "bg-slate-900",
      accent: "bg-slate-700",
      lines: "bg-slate-200",
    },
    creative: {
      container: "bg-stone-950",
      header: "bg-orange-500",
      accent: "bg-orange-400",
      lines: "bg-stone-700",
    },
  };

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {Object.values(templateConfig).map((template) => {
        const isSelected = selectedTemplate === template.id;
        const preview = previewStyles[template.id];

        return (
          <button
            key={template.id}
            type="button"
            onClick={() => onSelect(template.id)}
            className={`overflow-hidden rounded-2xl border text-left transition ${
              isSelected
                ? "border-ink ring-2 ring-ink/10"
                : "border-stone-200 hover:border-stone-400"
            }`}
          >
            {/* Preview */}
            <div className={`h-40 ${preview.container} p-4`}>
              <div
                className={`h-8 rounded-md ${preview.header}`}
              />

              <div className="mt-4 flex gap-3">
                <div
                  className={`h-20 w-1/3 rounded-md ${preview.accent}`}
                />

                <div className="flex-1 space-y-2">
                  <div
                    className={`h-2 w-3/4 rounded ${preview.lines}`}
                  />
                  <div
                    className={`h-2 w-full rounded ${preview.lines}`}
                  />
                  <div
                    className={`h-2 w-5/6 rounded ${preview.lines}`}
                  />
                  <div
                    className={`h-2 w-2/3 rounded ${preview.lines}`}
                  />
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="border-t border-stone-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-medium text-ink">
                  {template.name}
                </h3>

                {isSelected && (
                  <span className="shrink-0 rounded-full bg-ink px-2.5 py-1 text-xs font-medium text-white">
                    Selected
                  </span>
                )}
              </div>

              <p className="mt-2 text-sm leading-6 text-muted">
                {template.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default TemplateSelector;