import sanitizeHtml from "sanitize-html";

export const sanitizeText = (value) => {
  if (typeof value !== "string") return value;

  return sanitizeHtml(value, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim();
};

export const sanitizeUrl = (value) => {
  if (typeof value !== "string") return value;

  return value.trim();
};