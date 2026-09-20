const fs = require("fs");

const files = [
  "src/features/portfolio/components/CertificationSection.jsx",
  "src/features/portfolio/components/ExperienceSection.jsx",
  "src/features/portfolio/components/ProjectsSection.jsx",
];

const pairs = [
  [
    "w-full rounded-lg border border-white/10 bg-[#08090d] px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-cyan-500/50",
    "w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-ink placeholder-stone-400 outline-none transition focus:border-accent",
  ],
  [
    "w-full rounded-2xl border border-white/10 bg-[#0d0e14] p-5 shadow-xl sm:p-6",
    "w-full rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6",
  ],
  ["text-lg font-semibold text-white", "text-lg font-semibold text-ink"],
  ["mt-1 text-sm text-gray-500", "mt-1 text-sm text-muted"],
  ['? "bg-cyan-500"', '? "bg-accent"'],
  [': "bg-gray-700"', ': "bg-stone-300"'],
  [
    "border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400",
    "border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700",
  ],
  [
    "border border-cyan-500/20 bg-cyan-500/10 px-4 py-3 text-sm text-cyan-400",
    "border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800",
  ],
  [
    "h-28 animate-pulse rounded-xl bg-white/[0.03]",
    "h-28 animate-pulse rounded-xl bg-canvas",
  ],
  [
    "h-32 animate-pulse rounded-xl bg-white/[0.03]",
    "h-32 animate-pulse rounded-xl bg-canvas",
  ],
  [
    "rounded-xl border border-dashed border-white/10",
    "rounded-xl border border-dashed border-stone-300",
  ],
  ["text-sm text-gray-400", "text-sm text-stone-600"],
  ["mt-1 text-xs text-gray-600", "mt-1 text-xs text-muted"],
  [
    "rounded-xl border border-cyan-500/20 bg-[#10121a] p-4",
    "rounded-xl border border-accent/20 bg-emerald-50/40 p-4",
  ],
  [
    "rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:opacity-50",
    "rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50",
  ],
  [
    "rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:border-white/20 hover:text-white",
    "rounded-lg border border-stone-200 px-4 py-2 text-sm text-stone-600 transition hover:text-ink",
  ],
  [
    "group rounded-xl border border-white/10 bg-[#10121a] p-4 transition hover:border-cyan-500/20",
    "group rounded-xl border border-stone-200 bg-canvas p-4 transition hover:border-accent/30",
  ],
  ["text-base font-semibold text-white", "text-base font-semibold text-ink"],
  ["text-sm font-medium text-cyan-400", "text-sm font-medium text-accent"],
  ["mt-1 text-xs text-gray-500", "mt-1 text-xs text-muted"],
  ["mt-2 text-xs text-gray-500", "mt-2 text-xs text-muted"],
  [
    "mt-3 border-t border-white/5 pt-3 text-sm leading-6 text-gray-500",
    "mt-3 border-t border-stone-200 pt-3 text-sm leading-6 text-muted",
  ],
  [
    "text-xs text-gray-500 transition hover:text-cyan-400",
    "text-xs text-muted transition hover:text-accent",
  ],
  [
    "text-xs text-gray-500 transition hover:text-red-400 disabled:opacity-50",
    "text-xs text-muted transition hover:text-red-600 disabled:opacity-50",
  ],
  ["mt-6 border-t border-white/5 pt-5", "mt-6 border-t border-stone-100 pt-5"],
  ["mb-4 text-sm font-medium text-gray-300", "mb-4 text-sm font-medium text-stone-700"],
  [
    "mt-4 rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50",
    "mt-4 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50",
  ],
  [
    "flex items-center gap-3 rounded-lg border border-white/10 bg-[#08090d] px-3 py-2.5",
    "flex items-center gap-3 rounded-lg border border-stone-200 bg-white px-3 py-2.5",
  ],
  ['className="h-4 w-4 accent-cyan-500"', 'className="h-4 w-4 accent-emerald-600"'],
  ["text-sm text-gray-300", "text-sm text-stone-700"],
  [
    "inline-flex text-xs font-medium text-cyan-400 transition hover:text-cyan-300",
    "inline-flex text-xs font-medium text-accent transition hover:text-emerald-800",
  ],
  [
    "rounded-xl border border-gray-800 bg-gray-900/50 p-6",
    "rounded-2xl border border-stone-200 bg-white p-6",
  ],
  ["text-sm text-gray-500", "text-sm text-muted"],
  [
    "rounded-lg bg-cyan-500 px-4 py-2 text-sm font-medium text-black hover:bg-cyan-400",
    "rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700",
  ],
  ["mt-4 text-sm text-green-400", "mt-4 text-sm text-emerald-700"],
  ["mt-4 text-sm text-red-400", "mt-4 text-sm text-red-600"],
  [
    "mt-6 space-y-5 border-t border-gray-800 pt-6",
    "mt-6 space-y-5 border-t border-stone-100 pt-6",
  ],
  ["mb-2 block text-sm text-gray-300", "mb-2 block text-sm text-stone-700"],
  [
    "w-full rounded-lg border border-gray-700 bg-gray-950 px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500",
    "w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm text-ink outline-none focus:border-accent",
  ],
  [
    "flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-300",
    "flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs text-emerald-800",
  ],
  ["text-cyan-400 hover:text-white", "text-accent hover:text-ink"],
  ["block w-full text-sm text-gray-400", "block w-full text-sm text-muted"],
  [
    "rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-medium text-black hover:bg-cyan-400",
    "rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700",
  ],
  [
    "rounded-lg border border-gray-700 px-5 py-2.5 text-sm text-gray-300 hover:bg-gray-800",
    "rounded-lg border border-stone-200 px-5 py-2.5 text-sm text-stone-700 hover:bg-canvas",
  ],
  [
    "rounded-lg border border-dashed border-gray-700 p-8 text-center",
    "rounded-xl border border-dashed border-stone-300 p-8 text-center",
  ],
  [
    "rounded-xl border border-gray-800 bg-gray-950 p-5",
    "rounded-xl border border-stone-200 bg-canvas p-5",
  ],
  ["font-medium text-white", "font-medium text-ink"],
  ["mt-1 text-sm text-gray-400", "mt-1 text-sm text-muted"],
  [
    "rounded-full bg-gray-800 px-2.5 py-1 text-xs text-gray-300",
    "rounded-full bg-white px-2.5 py-1 text-xs text-stone-600",
  ],
  [
    "mt-4 flex flex-wrap gap-3 border-t border-gray-800 pt-4",
    "mt-4 flex flex-wrap gap-3 border-t border-stone-200 pt-4",
  ],
  [
    "text-sm text-cyan-400 hover:text-cyan-300",
    "text-sm text-accent hover:text-emerald-800",
  ],
  ["text-sm text-gray-400 hover:text-white", "text-sm text-stone-600 hover:text-ink"],
  ["text-sm text-red-400 hover:text-red-300", "text-sm text-red-600 hover:text-red-700"],
];

for (const file of files) {
  let s = fs.readFileSync(file, "utf8");
  for (const [a, b] of pairs) s = s.split(a).join(b);
  fs.writeFileSync(file, s);
  console.log("updated", file);
}
