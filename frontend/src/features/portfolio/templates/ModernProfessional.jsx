import { useMemo, useState } from "react";
import {
  collectSocialLinks,
  fontClasses,
  formatDate,
  formatDateRange,
} from "./templateHelpers";

const themeColors = {
  orange: {
    accent: "text-orange-700",
    accentBg: "bg-orange-700",
    accentHover: "hover:bg-orange-800",
    soft: "bg-orange-50 text-orange-800",
    ring: "ring-orange-200",
    borderHover: "hover:border-orange-200",
    focus: "focus-visible:outline-orange-700",
    bar: "bg-orange-700",
  },
  blue: {
    accent: "text-blue-700",
    accentBg: "bg-blue-700",
    accentHover: "hover:bg-blue-800",
    soft: "bg-blue-50 text-blue-800",
    ring: "ring-blue-200",
    borderHover: "hover:border-blue-200",
    focus: "focus-visible:outline-blue-700",
    bar: "bg-blue-700",
  },
  green: {
    accent: "text-emerald-700",
    accentBg: "bg-emerald-700",
    accentHover: "hover:bg-emerald-800",
    soft: "bg-emerald-50 text-emerald-800",
    ring: "ring-emerald-200",
    borderHover: "hover:border-emerald-200",
    focus: "focus-visible:outline-emerald-700",
    bar: "bg-emerald-700",
  },
  purple: {
    accent: "text-violet-700",
    accentBg: "bg-violet-700",
    accentHover: "hover:bg-violet-800",
    soft: "bg-violet-50 text-violet-800",
    ring: "ring-violet-200",
    borderHover: "hover:border-violet-200",
    focus: "focus-visible:outline-violet-700",
    bar: "bg-violet-700",
  },
  red: {
    accent: "text-red-700",
    accentBg: "bg-red-700",
    accentHover: "hover:bg-red-800",
    soft: "bg-red-50 text-red-800",
    ring: "ring-red-200",
    borderHover: "hover:border-red-200",
    focus: "focus-visible:outline-red-700",
    bar: "bg-red-700",
  },
};

const ModernProfessional = ({ data = {} }) => {
  const portfolio = data.portfolio || {};
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
  const displayName = personal.name || portfolio.title || "Professional";
  const [menuOpen, setMenuOpen] = useState(false);

  const mode = isDark
    ? {
        page: "bg-slate-950 text-slate-100",
        header: "bg-slate-950/95 border-slate-800",
        panel: "bg-slate-900 border-slate-800",
        muted: "text-slate-400",
        heading: "text-white",
        text: "text-slate-300",
        line: "border-slate-800",
        chip: "bg-slate-800 text-slate-300",
        ghost: "border-slate-700 text-slate-100 hover:bg-slate-800",
        nav: "text-slate-300 hover:text-white",
        footer: "bg-slate-900 border-slate-800",
        image: "bg-slate-800",
      }
    : {
        page: "bg-[#f4f6f9] text-slate-800",
        header: "bg-white/95 border-slate-200",
        panel: "bg-white border-slate-200",
        muted: "text-slate-500",
        heading: "text-slate-900",
        text: "text-slate-600",
        line: "border-slate-200",
        chip: "bg-slate-100 text-slate-600",
        ghost: "border-slate-300 text-slate-800 hover:bg-slate-50",
        nav: "text-slate-600 hover:text-slate-950",
        footer: "bg-slate-900 text-white border-slate-800",
        image: "bg-slate-100",
      };

  const sections = useMemo(() => {
    const items = [];
    if (about.content || portfolio.description) items.push({ id: "about", label: "About" });
    if (skills.length) items.push({ id: "skills", label: "Skills" });
    if (experience.length) items.push({ id: "experience", label: "Experience" });
    if (projects.length) items.push({ id: "projects", label: "Projects" });
    if (education.length) items.push({ id: "education", label: "Education" });
    if (certifications.length) items.push({ id: "certifications", label: "Certifications" });
    if (socialLinks.length || portfolio.resumeUrl) items.push({ id: "contact", label: "Contact" });
    return items;
  }, [
    about.content,
    portfolio.description,
    portfolio.resumeUrl,
    skills.length,
    experience.length,
    projects.length,
    education.length,
    certifications.length,
    socialLinks.length,
  ]);

  const sectionNumber = (id) => {
    const index = sections.findIndex((section) => section.id === id);
    return String((index >= 0 ? index : 0) + 1).padStart(2, "0");
  };

  const SectionLabel = ({ id, title }) => (
    <div className="md:pt-1">
      <p className={`text-[11px] font-semibold tracking-[0.22em] ${theme.accent}`}>
        {sectionNumber(id)}
      </p>
      <h2 className={`mt-2 text-sm font-semibold uppercase tracking-[0.16em] ${mode.heading}`}>
        {title}
      </h2>
    </div>
  );

  return (
    <div className={`min-h-screen ${fontClass} ${mode.page} antialiased`}>
      <div className={`h-1 ${theme.bar}`} />

      <header className={`relative sticky top-0 z-30 border-b ${mode.header} backdrop-blur`}>

        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <a href="#top" className={`truncate text-sm font-semibold ${mode.heading}`}>
            {displayName}
          </a>

          {sections.length > 0 && (
            <>
              <button
                type="button"
                className={`inline-flex items-center rounded-md border px-3 py-1.5 text-sm md:hidden ${mode.ghost} focus-visible:outline-2 focus-visible:outline-offset-2 ${theme.focus}`}
                aria-expanded={menuOpen}
                aria-controls="portfolio-nav"
                onClick={() => setMenuOpen((open) => !open)}
              >
                Menu
              </button>
              <nav
                id="portfolio-nav"
                aria-label="Page sections"
                className={`${menuOpen ? "absolute left-0 right-0 top-full border-b px-5 py-3" : "hidden"} md:static md:flex md:border-0 md:p-0 ${mode.header} md:bg-transparent`}
              >
                <ul className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-5">
                  {sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        onClick={() => setMenuOpen(false)}
                        className={`text-sm ${mode.nav} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                      >
                        {section.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
        <div className={`overflow-hidden rounded-2xl border shadow-sm ${mode.panel}`}>
          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center">
            <div>
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${theme.accent}`}>
                {personal.headline || "Professional"}
              </p>
              <h1 className={`mt-3 text-4xl font-semibold tracking-tight ${mode.heading} sm:text-5xl lg:text-[3.4rem] lg:leading-[1.1]`}>
                {displayName}
              </h1>
              {personal.location && (
                <p className={`mt-4 text-sm ${mode.muted}`}>{personal.location}</p>
              )}
              {(portfolio.resumeUrl || social.linkedin || social.github) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {social.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm ${theme.accentBg} ${theme.accentHover} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                    >
                      LinkedIn
                    </a>
                  )}
                  {social.github && (
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-semibold ${mode.ghost} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                    >
                      GitHub
                    </a>
                  )}
                  {portfolio.resumeUrl && (
                    <a
                      href={portfolio.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center rounded-lg border px-5 py-2.5 text-sm font-semibold ${mode.ghost} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                    >
                      Resume
                    </a>
                  )}
                </div>
              )}
            </div>

            {personal.profileImage && (
              <img
                src={personal.profileImage}
                alt={personal.name || portfolio.title}
                className={`mx-auto h-36 w-36 rounded-2xl object-cover shadow-md ring-1 ${mode.line} sm:h-44 sm:w-44 lg:mx-0 lg:justify-self-end`}
              />
            )}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-5 pb-16 sm:px-8">
        {(about.content || portfolio.description) && (
          <section id="about" className={`scroll-mt-24 border-b py-12 ${mode.line} lg:py-16`}>
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
              <SectionLabel id="about" title="About" />
              <p className={`max-w-3xl text-base leading-8 ${mode.text} sm:text-lg`}>
                {about.content || portfolio.description}
              </p>
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section id="skills" className={`scroll-mt-24 border-b py-12 ${mode.line} lg:py-16`}>
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
              <SectionLabel id="skills" title="Skills" />
              <ul className="flex max-w-3xl flex-wrap gap-2.5">
                {skills.map((skill, index) => (
                  <li
                    key={skill._id || skill.name || index}
                    className={`rounded-lg border px-3.5 py-2 text-sm font-medium shadow-sm ${mode.panel}`}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section id="experience" className={`scroll-mt-24 border-b py-12 ${mode.line} lg:py-16`}>
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
              <SectionLabel id="experience" title="Experience" />
              <div className="space-y-5">
                {experience.map((item, index) => (
                  <article
                    key={item._id || index}
                    className={`rounded-2xl border p-6 shadow-sm ${mode.panel}`}
                  >
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className={`text-xl font-semibold ${mode.heading}`}>{item.position}</h3>
                        <p className={`mt-1 text-sm font-medium ${theme.accent}`}>
                          {item.company}
                          {item.location && (
                            <span className={mode.muted}> · {item.location}</span>
                          )}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {(item.startDate || item.endDate || item.isCurrent) && (
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${mode.chip}`}>
                            {formatDateRange(item.startDate, item.endDate, {
                              presentIfOpen: item.isCurrent || !item.endDate,
                            })}
                          </span>
                        )}
                        {item.isCurrent && (
                          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${isDark ? "bg-emerald-900/40 text-emerald-300" : theme.soft}`}>
                            Present
                          </span>
                        )}
                      </div>
                    </div>
                    {item.description && (
                      <p className={`mt-4 text-sm leading-7 ${mode.text}`}>{item.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section id="projects" className={`scroll-mt-24 border-b py-12 ${mode.line} lg:py-16`}>
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
              <SectionLabel id="projects" title="Projects" />
              <div className="grid gap-6 sm:grid-cols-2">
                {projects.map((project, index) => (
                  <article
                    key={project._id || index}
                    className={`flex flex-col overflow-hidden rounded-2xl border shadow-sm transition ${mode.panel} ${theme.borderHover} hover:shadow-md`}
                  >
                    {project.image && (
                      <div className={`border-b ${mode.line} ${mode.image}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-44 w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className={`text-lg font-semibold ${mode.heading}`}>{project.title}</h3>
                      {project.description && (
                        <p className={`mt-3 text-sm leading-6 ${mode.text}`}>{project.description}</p>
                      )}
                      {project.technologies?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map((technology, techIndex) => (
                            <span
                              key={`${technology}-${techIndex}`}
                              className={`rounded-md px-2.5 py-1 text-xs font-medium ${mode.chip}`}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}
                      {(project.projectUrl || project.githubUrl) && (
                        <div className={`mt-auto flex flex-wrap gap-4 border-t pt-4 ${mode.line}`}>
                          {project.projectUrl && (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-sm font-semibold ${theme.accent} hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                            >
                              Live demo
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`text-sm font-semibold ${mode.muted} hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                            >
                              GitHub
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

        {education.length > 0 && (
          <section id="education" className={`scroll-mt-24 border-b py-12 ${mode.line} lg:py-16`}>
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
              <SectionLabel id="education" title="Education" />
              <div className="space-y-5">
                {education.map((item, index) => (
                  <article
                    key={item._id || index}
                    className={`rounded-2xl border p-6 shadow-sm ${mode.panel}`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                      <div>
                        <h3 className={`text-xl font-semibold ${mode.heading}`}>{item.degree}</h3>
                        <p className={`mt-1 text-sm font-medium ${theme.accent}`}>
                          {item.institution}
                          {item.fieldOfStudy && (
                            <span className={mode.muted}> · {item.fieldOfStudy}</span>
                          )}
                        </p>
                      </div>
                      {(item.startDate || item.endDate) && (
                        <span className={`h-fit rounded-full px-3 py-1 text-xs font-semibold ${mode.chip}`}>
                          {formatDateRange(item.startDate, item.endDate)}
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className={`mt-4 text-sm leading-7 ${mode.text}`}>{item.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section
            id="certifications"
            className={`scroll-mt-24 py-12 lg:py-16 ${socialLinks.length || portfolio.resumeUrl ? `border-b ${mode.line}` : ""}`}
          >
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
              <SectionLabel id="certifications" title="Certifications" />
              <div className="grid gap-5 sm:grid-cols-2">
                {certifications.map((item, index) => (
                  <article
                    key={item._id || index}
                    className={`rounded-2xl border p-6 shadow-sm ${mode.panel}`}
                  >
                    <h3 className={`font-semibold ${mode.heading}`}>{item.name}</h3>
                    <p className={`mt-1 text-sm font-medium ${theme.accent}`}>
                      {item.issuer}
                      {item.issueDate && (
                        <span className={`font-normal ${mode.muted}`}> · {formatDate(item.issueDate)}</span>
                      )}
                    </p>
                    {item.description && (
                      <p className={`mt-3 text-sm leading-6 ${mode.text}`}>{item.description}</p>
                    )}
                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-4 inline-block text-sm font-semibold ${theme.accent} hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                      >
                        Verify credential
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {(socialLinks.length > 0 || portfolio.resumeUrl) && (
          <section id="contact" className="scroll-mt-24 py-12 lg:py-16">
            <div className="grid gap-6 md:grid-cols-[180px_minmax(0,1fr)] md:gap-12">
              <SectionLabel id="contact" title="Contact" />
              <div className={`rounded-2xl border p-6 shadow-sm sm:p-8 ${mode.panel}`}>
                <p className={`max-w-xl text-sm leading-7 ${mode.text}`}>
                  Available for new opportunities. Reach out through any of the channels below.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {portfolio.resumeUrl && (
                    <a
                      href={portfolio.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex rounded-lg px-4 py-2.5 text-sm font-semibold text-white ${theme.accentBg} ${theme.accentHover} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                    >
                      Resume
                    </a>
                  )}
                  {socialLinks.map((link) => (
                    <a
                      key={link.key}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex rounded-lg border px-4 py-2.5 text-sm font-semibold ${mode.ghost} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className={`border-t ${mode.footer}`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="text-sm font-medium">{portfolio.title}</p>
          <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            © {new Date().getFullYear()} All rights reserved. Built with DevFolio
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ModernProfessional;
