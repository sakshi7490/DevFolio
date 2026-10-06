import axios from "axios";
import {  useState } from "react";
import {
  collectSocialLinks,
  fontClasses,
  formatDate,
  formatDateRange,
} from "./templateHelpers";

const themeColors = {
  orange: {
    accent: "text-orange-700",
    accentHover: "hover:text-orange-800",
    focus: "focus-visible:outline-orange-700",
  },
  blue: {
    accent: "text-blue-700",
    accentHover: "hover:text-blue-800",
    focus: "focus-visible:outline-blue-700",
  },
  green: {
    accent: "text-emerald-700",
    accentHover: "hover:text-emerald-800",
    focus: "focus-visible:outline-emerald-700",
  },
  purple: {
    accent: "text-violet-700",
    accentHover: "hover:text-violet-800",
    focus: "focus-visible:outline-violet-700",
  },
  red: {
    accent: "text-red-700",
    accentHover: "hover:text-red-800",
    focus: "focus-visible:outline-red-700",
  },
};

const MinimalDeveloper = ({ data = {} }) => {
  const portfolio = data.portfolio || {};
  const resumeTrackingUrl = portfolio.resumeUrl
  ? `http://localhost:5000/api/v1/portfolios/public/${portfolio.slug}/resume`
  : "";
  
  const personal = data.personal || {};
  const about = data.about || {};
  const social = data.social || {};
  const skills = data.skills || [];
  const education = data.education || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const experience = data.experience || [];

  const fontClass = fontClasses[portfolio.font || "inter"];
  const theme = themeColors[portfolio.themeColor || "orange"];
  const isDark = (portfolio.themeMode || "dark") === "dark";
  const socialLinks = collectSocialLinks(social);
  const displayName = personal.name || portfolio.title || "Developer Portfolio";

  const [contactForm, setContactForm] = useState({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const [contactStatus, setContactStatus] = useState({
  loading: false,
  success: "",
  error: "",
});

const handleContactSubmit = async (e) => {
  e.preventDefault();

  setContactStatus({
    loading: true,
    success: "",
    error: "",
  });

  try {
    await axios.post(
      `http://localhost:5000/api/v1/contact/${portfolio.slug}`,
      contactForm,
    );

    setContactForm({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    setContactStatus({
      loading: false,
      success: "Your message has been sent successfully.",
      error: "",
    });
  } catch (error) {
    setContactStatus({
      loading: false,
      success: "",
      error:
        error.response?.data?.message ||
        "Failed to send message.",
    });
  }
};

  const mode = isDark
    ? {
        page: "bg-[#111110] text-stone-200",
        heading: "text-stone-50",
        text: "text-stone-300",
        muted: "text-stone-500",
        hairline: "border-stone-800",
        button: "bg-stone-50 text-stone-950 hover:bg-white",
        ghost: "text-stone-300 hover:text-stone-50",
      }
    : {
        page: "bg-[#fbfaf7] text-stone-800",
        heading: "text-stone-950",
        text: "text-stone-600",
        muted: "text-stone-400",
        hairline: "border-stone-200",
        button: "bg-stone-950 text-white hover:bg-stone-800",
        ghost: "text-stone-600 hover:text-stone-950",
      };

  const linkClass = `underline decoration-transparent underline-offset-[5px] transition ${theme.accent} hover:decoration-current ${theme.accentHover} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`;

 return (
  <div className={`min-h-screen ${fontClass} ${mode.page} antialiased`}>
    <a
      href="#content"
      className="sr-only focus:not-sr-only focus:absolute focus:left-6 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-3 focus:py-2 focus:text-stone-900"
    >
      Skip to content
    </a>

    {/* HERO */}
    <header className={`relative overflow-hidden border-b ${mode.hairline}`}>
      <div
        className={`pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full blur-3xl ${
          isDark ? "bg-white/[0.03]" : "bg-stone-200/60"
        }`}
      />

      <div
        className={`pointer-events-none absolute -bottom-40 -left-32 h-80 w-80 rounded-full blur-3xl ${
          isDark ? "bg-white/[0.02]" : "bg-stone-100"
        }`}
      />

      <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="max-w-3xl">
          {personal.profileImage && (
            <div className="mb-8">
              <img
                src={personal.profileImage}
                alt={personal.name || "Profile"}
                className={`h-20 w-20 rounded-2xl object-cover ring-1 ${mode.hairline} sm:h-24 sm:w-24`}
              />
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className={`h-1.5 w-1.5 rounded-full ${theme.accent.replace("text-", "bg-")}`} />
            <p
              className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${mode.muted}`}
            >
              {personal.headline || "Software Developer"}
            </p>
          </div>

          <h1
            className={`mt-5 max-w-3xl text-5xl font-medium leading-[1.02] tracking-[-0.055em] ${mode.heading} sm:text-7xl`}
          >
            {displayName}
          </h1>

          {personal.location && (
            <p className={`mt-6 text-sm ${mode.muted}`}>
              Based in {personal.location}
            </p>
          )}

          {(portfolio.resumeUrl || socialLinks.length > 0) && (
            <nav
              aria-label="Profile links"
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              {portfolio.resumeUrl && (
                <a
                  href={resumeTrackingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition ${mode.button} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                >
                  Download Resume
                </a>
              )}

              {socialLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`rounded-full border ${mode.hairline} px-4 py-2.5 text-sm ${mode.ghost} transition hover:border-current focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>

    <main
      id="content"
      className="mx-auto max-w-4xl px-6 sm:px-8"
    >
      {/* ABOUT */}
      {(about.content || portfolio.description) && (
        <section className={`border-b ${mode.hairline} py-16 sm:py-24`}>
          <div className="grid gap-8 sm:grid-cols-[10rem_1fr] sm:gap-12">
            <h2
              className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${mode.muted}`}
            >
              About
            </h2>

            <p
              className={`max-w-2xl text-xl leading-[1.75] ${mode.text} sm:text-2xl`}
            >
              {about.content || portfolio.description}
            </p>
          </div>
        </section>
      )}

      {/* SKILLS */}
      {skills.length > 0 && (
        <section className={`border-b ${mode.hairline} py-16 sm:py-24`}>
          <div className="grid gap-8 sm:grid-cols-[10rem_1fr] sm:gap-12">
            <h2
              className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${mode.muted}`}
            >
              Skills
            </h2>

            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill, index) => (
                <span
                  key={skill._id || skill.name || index}
                  className={`rounded-full border ${mode.hairline} px-4 py-2 text-sm ${mode.text} transition hover:border-current`}
                >
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {experience.length > 0 && (
        <section className={`border-b ${mode.hairline} py-16 sm:py-24`}>
          <div className="grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-12">
            <h2
              className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${mode.muted}`}
            >
              Experience
            </h2>

            <div className="space-y-12">
              {experience.map((item, index) => (
                <article
                  key={item._id || index}
                  className="relative pl-6"
                >
                  <span
                    className={`absolute left-0 top-2 h-2 w-2 rounded-full ${theme.accent.replace(
                      "text-",
                      "bg-",
                    )}`}
                  />

                  <div className="grid gap-2 sm:grid-cols-[8rem_1fr] sm:gap-8">
                    <p
                      className={`pt-1 text-xs tracking-wide ${mode.muted}`}
                    >
                      {formatDateRange(item.startDate, item.endDate, {
                        presentIfOpen: true,
                      })}
                    </p>

                    <div>
                      <h3
                        className={`text-lg font-medium tracking-tight ${mode.heading}`}
                      >
                        {item.position}
                      </h3>

                      <p className={`mt-1 text-sm ${mode.text}`}>
                        {item.company}
                        {item.location && (
                          <span className={mode.muted}>
                            {" "}
                            · {item.location}
                          </span>
                        )}
                      </p>

                      {item.description && (
                        <p
                          className={`mt-4 max-w-xl text-sm leading-7 ${mode.text}`}
                        >
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className={`border-b ${mode.hairline} py-16 sm:py-24`}>
          <div className="grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-12">
            <h2
              className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${mode.muted}`}
            >
              Selected Work
            </h2>

            <div className="grid gap-6">
              {projects.map((project, index) => (
                <article
                  key={project._id || index}
                  className={`overflow-hidden rounded-2xl border ${mode.hairline} transition hover:-translate-y-0.5`}
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="aspect-[16/8] w-full object-cover"
                    />
                  )}

                  <div className="p-6 sm:p-7">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3
                          className={`text-xl font-medium tracking-tight ${mode.heading}`}
                        >
                          {project.title}
                        </h3>

                        {project.description && (
                          <p
                            className={`mt-3 max-w-2xl text-sm leading-7 ${mode.text}`}
                          >
                            {project.description}
                          </p>
                        )}
                      </div>

                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 sm:max-w-xs sm:justify-end">
                          {project.technologies.map((technology) => (
                            <span
                              key={technology}
                              className={`rounded-full border ${mode.hairline} px-2.5 py-1 text-[11px] ${mode.muted}`}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {(project.projectUrl || project.githubUrl) && (
                      <div className="mt-6 flex flex-wrap gap-5 text-sm">
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                          >
                            Live demo →
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={linkClass}
                          >
                            GitHub →
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {education.length > 0 && (
        <section className={`border-b ${mode.hairline} py-16 sm:py-24`}>
          <div className="grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-12">
            <h2
              className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${mode.muted}`}
            >
              Education
            </h2>

            <div className="space-y-10">
              {education.map((item, index) => (
                <article
                  key={item._id || index}
                  className={`border-l-2 pl-6 ${mode.hairline}`}
                >
                  <p className={`text-xs tracking-wide ${mode.muted}`}>
                    {formatDateRange(item.startDate, item.endDate)}
                  </p>

                  <h3
                    className={`mt-2 text-lg font-medium tracking-tight ${mode.heading}`}
                  >
                    {item.degree}
                  </h3>

                  <p className={`mt-1 text-sm ${mode.text}`}>
                    {item.institution}
                    {item.fieldOfStudy && (
                      <span className={mode.muted}>
                        {" "}
                        · {item.fieldOfStudy}
                      </span>
                    )}
                  </p>

                  {item.description && (
                    <p
                      className={`mt-3 max-w-xl text-sm leading-7 ${mode.text}`}
                    >
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CERTIFICATIONS */}
      {certifications.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-12">
            <h2
              className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${mode.muted}`}
            >
              Certifications
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              {certifications.map((item, index) => (
                <article
                  key={item._id || index}
                  className={`rounded-2xl border ${mode.hairline} p-5`}
                >
                  <h3
                    className={`text-base font-medium ${mode.heading}`}
                  >
                    {item.name}
                  </h3>

                  <p className={`mt-1 text-sm ${mode.muted}`}>
                    {item.issuer}
                    {item.issueDate && ` · ${formatDate(item.issueDate)}`}
                  </p>

                  {item.description && (
                    <p
                      className={`mt-3 text-sm leading-7 ${mode.text}`}
                    >
                      {item.description}
                    </p>
                  )}

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 inline-block text-sm ${linkClass}`}
                    >
                      Verify credential →
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>

          {/* CONTACT */}
      <section className={`border-t ${mode.hairline} py-16 sm:py-24`}>
        <div className="grid gap-10 sm:grid-cols-[10rem_1fr] sm:gap-12">
          <h2
            className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${mode.muted}`}
          >
            Contact
          </h2>

          <div className="max-w-2xl">
            <p className={`text-xl leading-8 ${mode.text}`}>
              Have an opportunity, idea, or just want to say hello?
            </p>

            <form
              onSubmit={handleContactSubmit}
              className="mt-8 space-y-4"
            >
              <input
                type="text"
                placeholder="Your name"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    name: e.target.value,
                  })
                }
                required
                className={`w-full rounded-xl border ${mode.hairline} bg-transparent px-4 py-3 text-sm outline-none ${mode.text}`}
              />

              <input
                type="email"
                placeholder="Your email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    email: e.target.value,
                  })
                }
                required
                className={`w-full rounded-xl border ${mode.hairline} bg-transparent px-4 py-3 text-sm outline-none ${mode.text}`}
              />

              <input
                type="text"
                placeholder="Subject"
                value={contactForm.subject}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    subject: e.target.value,
                  })
                }
                className={`w-full rounded-xl border ${mode.hairline} bg-transparent px-4 py-3 text-sm outline-none ${mode.text}`}
              />

              <textarea
                placeholder="Your message"
                rows={6}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({
                    ...contactForm,
                    message: e.target.value,
                  })
                }
                required
                className={`w-full rounded-xl border ${mode.hairline} bg-transparent px-4 py-3 text-sm outline-none ${mode.text}`}
              />

              <button
                type="submit"
                disabled={contactStatus.loading}
                className={`rounded-full px-5 py-2.5 text-sm font-medium shadow-sm transition ${mode.button} disabled:opacity-50`}
              >
                {contactStatus.loading ? "Sending..." : "Send Message"}
              </button>

              {contactStatus.success && (
                <p className="text-sm text-emerald-600">
                  {contactStatus.success}
                </p>
              )}

              {contactStatus.error && (
                <p className="text-sm text-red-600">
                  {contactStatus.error}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

    {/* FOOTER */}
    <footer className={`border-t ${mode.hairline}`}>
      <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className={`text-xs ${mode.muted}`}>
          © {new Date().getFullYear()}{" "}
          {personal.name || portfolio.title}. All rights reserved.
        </p>

        <a
          href="#content"
          className={`text-xs ${mode.muted} transition ${theme.accentHover} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  </div>
);
};

export default MinimalDeveloper;
