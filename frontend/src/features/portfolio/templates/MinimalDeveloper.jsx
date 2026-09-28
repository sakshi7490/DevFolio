import React from "react";

const MinimalDeveloper = ({ data = {} }) => {
  const {
    portfolio = {},
    personal = {},
    about = {},
    social = {},
    skills = [],
    education = [],
    certifications = [],
    projects = [],
    experience = [],
  } = data;



  const fontClasses = {
  inter: "font-sans",
  poppins: "font-display",
  serif: "font-serif",
  mono: "font-mono",
};

const fontClass = fontClasses[data.portfolio.font || "inter"];

  const themeColors = {
    orange: {
      accent: "text-orange-600",
      accentHover: "hover:text-orange-700",
      borderAccent: "hover:border-orange-300",
      soft: "bg-orange-50 text-orange-700",
    },
    blue: {
      accent: "text-blue-600",
      accentHover: "hover:text-blue-700",
      borderAccent: "hover:border-blue-300",
      soft: "bg-blue-50 text-blue-700",
    },
    green: {
      accent: "text-green-600",
      accentHover: "hover:text-green-700",
      borderAccent: "hover:border-green-300",
      soft: "bg-green-50 text-green-700",
    },
    purple: {
      accent: "text-purple-600",
      accentHover: "hover:text-purple-700",
      borderAccent: "hover:border-purple-300",
      soft: "bg-purple-50 text-purple-700",
    },
    red: {
      accent: "text-red-600",
      accentHover: "hover:text-red-700",
      borderAccent: "hover:border-red-300",
      soft: "bg-red-50 text-red-700",
    },
  };

  const theme = themeColors[portfolio.themeColor || "orange"];
  const isDark = (portfolio.themeMode || "dark") === "dark";

  const mode = isDark
    ? {
        page: "bg-stone-950 text-stone-100",
        header: "bg-stone-950/90 border-stone-800",
        heading: "text-stone-100",
        text: "text-stone-300",
        muted: "text-stone-400",
        border: "border-stone-800",
        card: "bg-stone-900 border-stone-800",
        softCard: "bg-stone-900/60",
        image: "bg-stone-800",
        footer: "bg-stone-950",
        button: "bg-stone-100 text-stone-900 hover:bg-white",
        outline: "border-stone-700 bg-stone-900 text-stone-200 hover:bg-stone-800",
        tech: "bg-stone-800 text-stone-300",
      }
    : {
        page: "bg-[#fafaf9] text-stone-900",
        header: "bg-white/80 border-stone-200/80",
        heading: "text-stone-900",
        text: "text-stone-700",
        muted: "text-stone-500",
        border: "border-stone-200/80",
        card: "bg-white border-stone-200/90",
        softCard: "bg-stone-50",
        image: "bg-stone-100",
        footer: "bg-white",
        button: "bg-stone-900 text-white hover:bg-stone-800",
        outline: "border-stone-300 bg-white text-stone-700 hover:bg-stone-50 hover:border-stone-400",
        tech: "bg-stone-100 text-stone-600",
      };


  return (
    <div className={`min-h-screen ${fontClass} ${mode.page} antialiased`}>
      {/* Hero Section */}
      <header className={`border-b ${mode.header} backdrop-blur-sm sticky top-0 z-10 sm:relative`}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:px-8">
          <div className="flex flex-col-reverse gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode.muted}`}>
                {personal?.headline || "Software Developer"}
              </p>

              <h1 className={`mt-3 text-4xl font-semibold tracking-tight ${mode.heading} sm:text-6xl`}>
                {personal?.name || portfolio?.title || "Developer Portfolio"}
              </h1>

              {personal?.location && (
                <p className={`mt-3 flex items-center gap-1.5 text-sm font-medium ${mode.muted}`}>
                  <svg className={`w-4 h-4 ${mode.muted}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {personal.location}
                </p>
              )}

              {/* Action Buttons & Links */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {portfolio?.resumeUrl && (
                  <a
                    href={portfolio.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-lg ${mode.button} px-5 py-2.5 text-sm font-medium shadow-sm transition active:scale-[0.98]`}
                  >
                    View Resume
                  </a>
                )}

                {social?.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-lg border ${mode.outline} px-4 py-2.5 text-sm font-medium shadow-sm transition`}
                  >
                    GitHub
                  </a>
                )}

                {social?.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center rounded-lg border ${mode.outline} px-4 py-2.5 text-sm font-medium shadow-sm transition`}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            {/* Profile Avatar */}
            {personal?.profileImage && (
              <div className="relative shrink-0">
                <img
                  src={personal.profileImage}
                  alt={personal.name || "Profile"}
                  className={`h-32 w-32 rounded-2xl object-cover ring-1 ${mode.border} shadow-sm sm:h-40 sm:w-40`}
                />
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12 sm:py-16 lg:px-8 space-y-16">
        {/* About Section */}
        {(about?.content || portfolio?.description) && (
          <section className={`border-b ${mode.border} pb-12`}>
            <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode.muted}`}>
              About
            </h2>
            <p className={`mt-4 max-w-3xl text-lg leading-relaxed ${mode.text} font-normal`}>
              {about?.content || portfolio?.description}
            </p>
          </section>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <section className={`border-b ${mode.border} pb-12`}>
            <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode.muted}`}>
              Skills & Expertise
            </h2>
            <div className="mt-6 flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={skill._id || skill.name || index}
                  className={`inline-flex items-center rounded-md border ${mode.card} px-3.5 py-1.5 text-sm font-medium ${mode.text} shadow-2xs transition ${theme.borderAccent}`}
                >
                  {skill.name || skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Work Experience Section */}
        {experience?.length > 0 && (
          <section className={`border-b ${mode.border} pb-12`}>
            <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode.muted}`}>
              Work Experience
            </h2>
            <div className="mt-8 space-y-10">
              {experience.map((item, index) => (
                <article key={item._id || index} className="group relative">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className={`text-xl font-semibold ${mode.heading}`}>
                      {item.position}
                    </h3>
                    {(item.startDate || item.endDate) && (
                      <span className={`text-xs font-medium ${mode.muted} sm:text-right`}>
                        {item.startDate} {item.endDate ? `— ${item.endDate}` : "— Present"}
                      </span>
                    )}
                  </div>

                  <p className={`mt-1 text-sm font-medium ${mode.text}`}>
                    {item.company}
                    {item.location && <span className={mode.muted}> · {item.location}</span>}
                  </p>

                  {item.description && (
                    <p className={`mt-3 max-w-3xl text-sm leading-relaxed ${mode.text}`}>
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Selected Projects Section */}
        {projects?.length > 0 && (
          <section className={`border-b ${mode.border} pb-12`}>
            <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode.muted}`}>
              Selected Projects
            </h2>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {projects.map((project, index) => (
                <article
                  key={project._id || index}
                  className={`group flex flex-col overflow-hidden rounded-xl border ${mode.card} transition ${theme.borderAccent} hover:shadow-sm`}
                >
                  {project.image && (
                    <div className={`overflow-hidden border-b ${mode.border} ${mode.image}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-48 w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className={`text-lg font-semibold ${mode.heading}`}>
                        {project.title}
                      </h3>

                      {project.description && (
                        <p className={`mt-2 text-sm leading-relaxed ${mode.text} line-clamp-3`}>
                          {project.description}
                        </p>
                      )}

                      {project.technologies?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={`${tech}-${techIndex}`}
                              className={`rounded px-2 py-0.5 text-xs font-medium ${mode.tech}`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className={`mt-6 flex items-center gap-4 border-t ${mode.border} pt-2 text-xs font-medium`}>
                      {project.projectUrl && (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 ${theme.accent} underline underline-offset-4 ${theme.accentHover}`}
                        >
                          Live Demo ↗
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 ${mode.text} underline underline-offset-4 ${theme.accentHover}`}
                        >
                          Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Education Section */}
        {education?.length > 0 && (
          <section className={`border-b ${mode.border} pb-12`}>
            <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode.muted}`}>
              Education
            </h2>

            <div className="mt-8 space-y-6">
              {education.map((item, index) => (
                <article key={item._id || index}>
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className={`text-lg font-semibold ${mode.heading}`}>
                      {item.degree}
                    </h3>
                    {(item.startDate || item.endDate) && (
                      <span className="text-xs font-medium text-stone-500">
                        {item.startDate} {item.endDate ? `— ${item.endDate}` : ""}
                      </span>
                    )}
                  </div>

                  <p className={`mt-1 text-sm font-medium ${mode.text}`}>
                    {item.institution}
                    {item.fieldOfStudy && <span className={mode.muted}> · {item.fieldOfStudy}</span>}
                  </p>

                  {item.description && (
                    <p className={`mt-2 text-sm leading-relaxed ${mode.text}`}>
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Certifications Section */}
        {certifications?.length > 0 && (
          <section className="pb-8">
            <h2 className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode.muted}`}>
              Certifications
            </h2>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {certifications.map((item, index) => (
                <article
                  key={item._id || index}
                  className={`rounded-lg border ${mode.card} p-5 transition ${theme.borderAccent}`}
                >
                  <h3 className={`text-sm font-semibold ${mode.heading}`}>
                    {item.name}
                  </h3>

                  <p className={`mt-1 text-xs font-medium ${mode.muted}`}>
                    {item.issuer}
                    {item.issueDate && ` · ${item.issueDate}`}
                  </p>

                  {item.description && (
                    <p className={`mt-2 text-xs leading-relaxed ${mode.text}`}>
                      {item.description}
                    </p>
                  )}

                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-3 inline-block text-xs font-medium ${theme.accent} underline underline-offset-4 ${theme.accentHover}`}
                    >
                      Verify Credential ↗
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className={`border-t ${mode.border} ${mode.footer}`}>
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className={`text-xs font-medium ${mode.muted}`}>
            © {new Date().getFullYear()} {personal?.name || portfolio?.title}. All rights reserved.
          </p>
          <a href="#top" className={`text-xs font-medium ${mode.muted} ${theme.accentHover}`}>
            Back to top ↑
          </a>
        </div>
      </footer>
    </div>
  );
};

export default MinimalDeveloper;