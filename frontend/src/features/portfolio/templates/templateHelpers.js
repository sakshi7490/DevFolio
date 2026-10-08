import api from "../../../api/axios";

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

export const getResumeTrackingUrl = (portfolio = {}) => {
  if (!portfolio.resumeUrl || !portfolio.slug) return "";

  const base = String(api.defaults.baseURL || "").replace(/\/$/, "");
  return `${base}/portfolios/public/${portfolio.slug}/resume`;
};

export const submitPortfolioContact = (slug, contactForm) =>
  api.post(`/contact/${slug}`, contactForm);

export const buildSectionNav = ({
  about,
  portfolio,
  skills = [],
  experience = [],
  projects = [],
  education = [],
  certifications = [],
} = {}) => {
  const items = [];

  if (about?.content || portfolio?.description) {
    items.push({ id: "about", label: "About" });
  }
  if (skills.length) items.push({ id: "skills", label: "Skills" });
  if (experience.length) items.push({ id: "experience", label: "Experience" });
  if (projects.length) items.push({ id: "projects", label: "Projects" });
  if (education.length) items.push({ id: "education", label: "Education" });
  if (certifications.length) {
    items.push({ id: "certifications", label: "Certifications" });
  }

  items.push({ id: "contact", label: "Contact" });
  return items;
};
