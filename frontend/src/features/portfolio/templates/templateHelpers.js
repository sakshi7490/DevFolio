export const fontClasses = {
  inter: "font-sans",
  poppins: "font-display",
  serif: "font-serif",
  mono: "font-mono",
};

export const formatDate = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

export const formatDateRange = (startDate, endDate, { presentIfOpen = false } = {}) => {
  const start = formatDate(startDate);
  const end = formatDate(endDate);

  if (!start && !end) return "";
  if (start && end) return `${start} — ${end}`;
  if (start && presentIfOpen) return `${start} — Present`;
  return start || end;
};

export const collectSocialLinks = (social = {}) =>
  [
    { key: "github", label: "GitHub", href: social?.github },
    { key: "linkedin", label: "LinkedIn", href: social?.linkedin },
    { key: "twitter", label: "Twitter", href: social?.twitter },
    { key: "instagram", label: "Instagram", href: social?.instagram },
    { key: "website", label: "Website", href: social?.website },
  ].filter((link) => Boolean(link.href));
