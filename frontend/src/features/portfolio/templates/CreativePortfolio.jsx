const themeColors = {
  orange: {
    text: "text-orange-400",
    bg: "bg-orange-500",
    hover: "hover:bg-orange-400",
    border: "border-orange-400/50",
    softBg: "bg-orange-400/10",
    softHover: "hover:bg-orange-400/5",
    glow: "bg-orange-500/15",
    shadow: "shadow-orange-500/10",
  },

  blue: {
    text: "text-blue-400",
    bg: "bg-blue-500",
    hover: "hover:bg-blue-400",
    border: "border-blue-400/50",
    softBg: "bg-blue-400/10",
    softHover: "hover:bg-blue-400/5",
    glow: "bg-blue-500/15",
    shadow: "shadow-blue-500/10",
  },

  green: {
    text: "text-green-400",
    bg: "bg-green-500",
    hover: "hover:bg-green-400",
    border: "border-green-400/50",
    softBg: "bg-green-400/10",
    softHover: "hover:bg-green-400/5",
    glow: "bg-green-500/15",
    shadow: "shadow-green-500/10",
  },

  purple: {
    text: "text-purple-400",
    bg: "bg-purple-500",
    hover: "hover:bg-purple-400",
    border: "border-purple-400/50",
    softBg: "bg-purple-400/10",
    softHover: "hover:bg-purple-400/5",
    glow: "bg-purple-500/15",
    shadow: "shadow-purple-500/10",
  },

  red: {
    text: "text-red-400",
    bg: "bg-red-500",
    hover: "hover:bg-red-400",
    border: "border-red-400/50",
    softBg: "bg-red-400/10",
    softHover: "hover:bg-red-400/5",
    glow: "bg-red-500/15",
    shadow: "shadow-red-500/10",
  },
};

const fontClasses = {
  inter: "font-sans",
  poppins: "font-display",
  serif: "font-serif",
  mono: "font-mono",
};

const CreativePortfolio = ({ data }) => {
  const {
    portfolio,
    personal,
    about,
    social,
    skills,
    education,
    certifications,
    projects,
    experience,
  } = data;

  const theme =
    themeColors[portfolio.themeColor || "orange"];

  const fontClass =
    fontClasses[portfolio.font || "inter"];

const isDark = (portfolio.themeMode || "dark") === "dark";

const mode = isDark
  ? {
      page: "bg-stone-950 text-stone-100",
      section: "bg-stone-900/40",
      card: "bg-stone-900/60 border-stone-800",
      muted: "text-stone-400",
      border: "border-stone-800",
    }
  : {
      page: "bg-white text-stone-900",
      section: "bg-stone-50",
      card: "bg-white border-stone-200",
      muted: "text-stone-500",
      border: "border-stone-200",
    };

  return (
    <div
  className={`min-h-screen ${fontClass} ${mode.page}`}
>
      {/* ================= HERO ================= */}
      <section
  className={`relative overflow-hidden border-b ${mode.border}`}
>
        {/* Background glow */}
        <div
          className={`pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full ${theme.glow} blur-3xl`}
        />

        <div className={`pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full ${isDark ? "bg-purple-500/15" : "bg-purple-200/40"} blur-3xl`} />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col-reverse gap-14 md:flex-row md:items-center md:justify-between">
            {/* Hero content */}
            <div className="max-w-3xl">
              <div className={`mb-6 inline-flex items-center gap-3 rounded-full border ${mode.border} ${isDark ? "bg-stone-900/70" : "bg-white/80"} px-4 py-2 backdrop-blur-sm`}>
                <span
                  className={`h-2 w-2 rounded-full ${theme.bg}`}
                />

                <p className={`text-xs font-semibold uppercase tracking-[0.2em] ${mode.muted}`}>
                  {personal?.headline ||
                    "Creative Professional"}
                </p>
              </div>

              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                {personal?.name || portfolio.title}
                <span className={theme.text}>.</span>
              </h1>

              {portfolio.description && (
                <p
  className={`mt-7 max-w-2xl text-lg leading-8 ${mode.muted} sm:text-xl`}
>
                  {portfolio.description}
                </p>
              )}

              {personal?.location && (
                <div className={`mt-5 flex items-center gap-2 text-sm ${mode.muted}`}>
                  <span className={theme.text}>●</span>
                  {personal.location}
                </div>
              )}

              <div className="mt-9 flex flex-wrap gap-3">
                {social?.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border ${mode.border} ${isDark ? "bg-stone-900/50 text-stone-200" : "bg-white/70 text-stone-700"} px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${theme.border} ${theme.text}`}
                  >
                    GitHub
                  </a>
                )}

                {social?.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border ${mode.border} ${isDark ? "bg-stone-900/50 text-stone-200" : "bg-white/70 text-stone-700"} px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 ${theme.border} ${theme.text}`}
                  >
                    LinkedIn
                  </a>
                )}

                {portfolio.resumeUrl && (
                  <a
                    href={portfolio.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full ${theme.bg} px-6 py-2.5 text-sm font-bold text-white shadow-lg ${theme.shadow} transition hover:-translate-y-0.5 ${theme.hover}`}
                  >
                    View Resume →
                  </a>
                )}
              </div>
            </div>

            {/* Profile image */}
            {personal?.profileImage && (
              <div className="relative mx-auto shrink-0 md:mx-0">
                <div
                  className={`absolute -inset-4 rounded-[2.5rem] ${theme.glow} blur-2xl`}
                />

                <div className="relative">
                  <div
                    className={`absolute -inset-2 rounded-[2.2rem] border ${theme.border} rotate-3 transition duration-500`}
                  />

                  <img
                    src={personal.profileImage}
                    alt={personal.name || portfolio.title}
                    className={`relative h-48 w-48 rounded-[2rem] border ${mode.border} object-cover shadow-2xl sm:h-56 sm:w-56`}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ================= ABOUT ================= */}
        {(about?.content || portfolio.description) && (
          <section className={`border-b ${mode.border} py-20 lg:py-24`}>
            <div className="grid gap-10 md:grid-cols-[220px_1fr]">
              <div>
                <p
                  className={`text-xs font-bold tracking-[0.2em] ${theme.text}`}
                >
                  01
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  About Me
                </h2>

                <div
                  className={`mt-4 h-1 w-10 rounded-full ${theme.bg}`}
                />
              </div>

              <p className={`max-w-3xl text-lg leading-8 ${mode.muted} sm:text-xl sm:leading-9`}>
                {about?.content || portfolio.description}
              </p>
            </div>
          </section>
        )}

        {/* ================= SKILLS ================= */}
        {skills?.length > 0 && (
          <section className={`border-b ${mode.border} py-20 lg:py-24`}>
            <div className="grid gap-10 md:grid-cols-[220px_1fr]">
              <div>
                <p
                  className={`text-xs font-bold tracking-[0.2em] ${theme.text}`}
                >
                  02
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Skills
                </h2>

                <p className={`mt-3 max-w-[180px] text-sm leading-6 ${mode.muted}`}>
                  Tools and technologies I work with.
                </p>
              </div>

              <div className="flex max-w-3xl flex-wrap content-start gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill._id}
                    className={`rounded-full border ${mode.card} px-5 py-2.5 text-sm font-medium shadow-sm transition duration-300 hover:-translate-y-0.5 ${theme.border} ${theme.softHover} ${theme.text}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= EXPERIENCE ================= */}
        {experience?.length > 0 && (
          <section className={`border-b ${mode.border} py-20 lg:py-24`}>
            <div className="grid gap-10 md:grid-cols-[220px_1fr]">
              <div>
                <p
                  className={`text-xs font-bold tracking-[0.2em] ${theme.text}`}
                >
                  03
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Experience
                </h2>
              </div>

              <div className={`relative max-w-3xl space-y-6 border-l ${mode.border} pl-7 sm:pl-9`}>
                {experience.map((item) => (
                  <article
                    key={item._id}
                    className={`relative rounded-2xl border ${mode.card} p-6 transition duration-300 hover:-translate-y-0.5 ${theme.border}`}
                  >
                    <span
                      className={`absolute -left-[34px] top-7 h-3 w-3 rounded-full border-2 ${theme.border} ${isDark ? "bg-stone-950" : "bg-white"} sm:-left-[40px]`}
                    />

                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <h3 className="text-xl font-bold">
                          {item.position}
                        </h3>

                        <p
                          className={`mt-1 text-sm font-semibold ${theme.text}`}
                        >
                          {item.company}
                          {item.location &&
                            ` · ${item.location}`}
                        </p>
                      </div>

                      <span className={`h-fit rounded-full border ${mode.border} ${isDark ? "bg-stone-950" : "bg-stone-100"} px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${mode.muted}`}>
                        {item.isCurrent
                          ? "Currently working"
                          : "Experience"}
                      </span>
                    </div>

                    {item.description && (
                      <p className={`mt-5 leading-7 ${mode.muted}`}>
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= PROJECTS ================= */}
        {projects?.length > 0 && (
          <section className={`border-b ${mode.border} py-20 lg:py-24`}>
            <div className="grid gap-10 md:grid-cols-[220px_1fr]">
              <div>
                <p
                  className={`text-xs font-bold tracking-[0.2em] ${theme.text}`}
                >
                  04
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Projects
                </h2>

                <p className={`mt-3 max-w-[180px] text-sm leading-6 ${mode.muted}`}>
                  Selected work and things I have built.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                  <article
                    key={project._id}
                    className={`group overflow-hidden rounded-2xl border ${mode.card} shadow-sm transition duration-300 hover:-translate-y-1 ${theme.border}`}
                  >
                    {project.image && (
                      <div className={`overflow-hidden ${isDark ? "bg-stone-800" : "bg-stone-100"}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-52 w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-xl font-bold">
                          {project.title}
                        </h3>

                        <span
                          className={`mt-2 h-2 w-2 shrink-0 rounded-full ${theme.bg}`}
                        />
                      </div>

                      {project.description && (
                        <p className={`mt-3 text-sm leading-6 ${mode.muted}`}>
                          {project.description}
                        </p>
                      )}

                      {project.technologies?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.map(
                            (technology, index) => (
                              <span
                                key={`${technology}-${index}`}
                                className={`rounded-lg border ${mode.border} ${isDark ? "bg-stone-950" : "bg-stone-50"} px-2.5 py-1.5 text-xs font-medium ${mode.muted}`}
                              >
                                {technology}
                              </span>
                            ),
                          )}
                        </div>
                      )}

                      <div className={`mt-6 flex flex-wrap gap-4 border-t ${mode.border} pt-5`}>
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-bold ${theme.text} transition ${theme.hover}`}
                          >
                            View Project →
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-semibold ${mode.muted} transition ${isDark ? "hover:text-white" : "hover:text-stone-900"}`}
                          >
                            GitHub ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= EDUCATION ================= */}
        {education?.length > 0 && (
          <section className={`border-b ${mode.border} py-20 lg:py-24`}>
            <div className="grid gap-10 md:grid-cols-[220px_1fr]">
              <div>
                <p
                  className={`text-xs font-bold tracking-[0.2em] ${theme.text}`}
                >
                  05
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Education
                </h2>
              </div>

              <div className="max-w-3xl space-y-5">
                {education.map((item) => (
                  <article
                    key={item._id}
                    className={`rounded-2xl border ${mode.card} p-6 transition ${theme.border}`}
                  >
                    <div className="flex gap-4">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${theme.softBg} text-xs font-bold ${theme.text}`}
                      >
                        EDU
                      </div>

                      <div>
                        <h3 className="text-xl font-bold">
                          {item.degree}
                        </h3>

                        <p
                          className={`mt-1 text-sm font-semibold ${theme.text}`}
                        >
                          {item.institution}
                          {item.fieldOfStudy &&
                            ` · ${item.fieldOfStudy}`}
                        </p>
                      </div>
                    </div>

                    {item.description && (
                      <p className={`mt-5 pl-[60px] leading-7 ${mode.muted}`}>
                        {item.description}
                      </p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ================= CERTIFICATIONS ================= */}
        {certifications?.length > 0 && (
          <section className="py-20 lg:py-24">
            <div className="grid gap-10 md:grid-cols-[220px_1fr]">
              <div>
                <p
                  className={`text-xs font-bold tracking-[0.2em] ${theme.text}`}
                >
                  06
                </p>

                <h2 className="mt-3 text-3xl font-bold tracking-tight">
                  Certifications
                </h2>
              </div>

              <div className="grid max-w-3xl gap-5 md:grid-cols-2">
                {certifications.map((item) => (
                  <article
                    key={item._id}
                    className={`group rounded-2xl border ${mode.card} p-6 transition duration-300 hover:-translate-y-1 ${theme.border}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${theme.softBg} ${theme.text}`}
                      >
                        ✓
                      </div>

                      {item.credentialUrl && (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs font-semibold ${mode.muted} transition ${theme.text}`}
                        >
                          Verify ↗
                        </a>
                      )}
                    </div>

                    <h3 className="mt-5 font-bold">
                      {item.name}
                    </h3>

                    <p
                      className={`mt-1 text-sm font-semibold ${theme.text}`}
                    >
                      {item.issuer}
                    </p>

                    {item.description && (
                      <p className={`mt-3 text-sm leading-6 ${mode.muted}`}>
                        {item.description}
                      </p>
                    )}

                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-5 inline-block text-sm font-semibold transition ${theme.text}`}
                      >
                        View Credential →
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* ================= FOOTER ================= */}
      <footer className={`border-t ${mode.border} ${isDark ? "bg-stone-950" : "bg-stone-50"}`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-semibold">
              {portfolio.title}
            </p>

            <p className={`mt-1 text-sm ${mode.muted}`}>
              Built with DevFolio
            </p>
          </div>

          <p className={`text-xs ${mode.muted}`}>
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreativePortfolio;