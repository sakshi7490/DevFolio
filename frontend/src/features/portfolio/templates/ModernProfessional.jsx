
const ModernProfessional = ({ data }) => {
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

  

  const fontClasses = {
  inter: "font-sans",
  poppins: "font-display",
  serif: "font-serif",
  mono: "font-mono",
};

const fontClass = fontClasses[data.portfolio.font || "inter"];


  const isDark = (portfolio.themeMode || "dark") === "dark";

  const mode = isDark
    ? {
        page: "bg-slate-950 text-slate-100",
        hero: "bg-slate-950 text-white",
        section: "border-slate-800",
        card: "bg-slate-900 border-slate-800",
        muted: "text-slate-400",
        heading: "text-slate-100",
        soft: "bg-slate-800 text-slate-300",
        imageBg: "bg-slate-800",
      }
    : {
        page: "bg-[#fafaf9] text-slate-900",
        hero: "bg-white text-slate-900",
        section: "border-slate-200",
        card: "bg-white border-slate-200",
        muted: "text-slate-600",
        heading: "text-slate-900",
        soft: "bg-slate-100 text-slate-500",
        imageBg: "bg-slate-100",
      };

  return (
    <div className={`min-h-screen ${fontClass} ${mode.page} antialiased`}>
      {/* ================= HERO ================= */}
      <section className={`relative overflow-hidden ${mode.hero}`}>
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-32 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="flex flex-col-reverse gap-12 md:flex-row md:items-center md:justify-between">
            {/* Hero Content */}
            <div className="max-w-3xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />

                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
                  {personal?.headline || "Professional"}
                </span>
              </div>

              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                {personal?.name || portfolio.title}
              </h1>

              {personal?.location && (
                <p className={`mt-5 flex items-center gap-2 text-sm ${mode.muted}`}>
                  <span className="text-emerald-400">●</span>
                  {personal.location}
                </p>
              )}

              <div className="mt-9 flex flex-wrap gap-3">
                {social?.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-emerald-50"
                  >
                    LinkedIn
                  </a>
                )}

                {social?.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
                  >
                    GitHub
                  </a>
                )}

                {portfolio.resumeUrl && (
                  <a
                    href={portfolio.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-emerald-400/40 hover:bg-emerald-400/10"
                  >
                    Resume
                  </a>
                )}
              </div>
            </div>

            {/* Profile Image */}
            {personal?.profileImage && (
              <div className="relative shrink-0">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-emerald-400/30 to-cyan-400/20 blur-xl" />

                <div className="relative rounded-[2rem] border border-white/10 bg-white/5 p-2">
                  <img
                    src={personal.profileImage}
                    alt={personal.name || portfolio.title}
                    className="h-36 w-36 rounded-[1.5rem] object-cover sm:h-44 sm:w-44"
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
          <section className={`border-b ${mode.section} py-16 lg:py-20`}>
            <div className="grid gap-8 md:grid-cols-[180px_1fr]">
              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-emerald-600">
                  01
                </span>

                <h2 className={`mt-2 text-sm font-bold uppercase tracking-[0.16em] ${mode.muted}`}>
                  About
                </h2>
              </div>

              <p className={`max-w-3xl text-lg leading-8 ${mode.muted}`}>
                {about?.content || portfolio.description}
              </p>
            </div>
          </section>
        )}

        {/* ================= SKILLS ================= */}
        {skills?.length > 0 && (
          <section className={`border-b ${mode.section} py-16 lg:py-20`}>
            <div className="grid gap-8 md:grid-cols-[180px_1fr]">
              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-emerald-600">
                  02
                </span>

                <h2 className={`mt-2 text-sm font-bold uppercase tracking-[0.16em] ${mode.muted}`}>
                  Skills
                </h2>
              </div>

              <div className="flex max-w-3xl flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill._id}
                    className={`rounded-xl border ${mode.card} px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700`}
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
          <section className={`border-b ${mode.section} py-16 lg:py-20`}>
            <div className="grid gap-8 md:grid-cols-[180px_1fr]">
              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-emerald-600">
                  03
                </span>

                <h2 className={`mt-2 text-sm font-bold uppercase tracking-[0.16em] ${mode.muted}`}>
                  Experience
                </h2>
              </div>

              <div className={`relative max-w-3xl space-y-6 border-l ${mode.section} pl-6 sm:pl-8`}>
                {experience.map((item) => (
                  <article
                    key={item._id}
                    className={`relative rounded-2xl border ${mode.card} p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md`}
                  >
                    <span className={`absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-emerald-500 ${isDark ? "bg-slate-950" : "bg-[#fafaf9]"} sm:-left-[37px]`} />

                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <h3 className={`text-xl font-bold ${mode.heading}`}>
                          {item.position}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-emerald-600">
                          {item.company}
                          {item.location && ` · ${item.location}`}
                        </p>
                      </div>

                      <span className={`h-fit rounded-full ${mode.soft} px-3 py-1 text-xs font-semibold`}>
                        {item.isCurrent ? "Present" : "Experience"}
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
          <section className={`border-b ${mode.section} py-16 lg:py-20`}>
            <div className="grid gap-8 md:grid-cols-[180px_1fr]">
              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-emerald-600">
                  04
                </span>

                <h2 className={`mt-2 text-sm font-bold uppercase tracking-[0.16em] ${mode.muted}`}>
                  Projects
                </h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {projects.map((project) => (
                  <article
                    key={project._id}
                    className={`group overflow-hidden rounded-2xl border ${mode.card} shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl`}
                  >
                    {project.image && (
                      <div className={`overflow-hidden ${mode.imageBg}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className={`text-xl font-bold ${mode.heading}`}>
                          {project.title}
                        </h3>

                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
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
                                className={`rounded-lg ${mode.soft} px-2.5 py-1.5 text-xs font-medium`}
                              >
                                {technology}
                              </span>
                            )
                          )}
                        </div>
                      )}

                      <div className={`mt-6 flex flex-wrap gap-4 border-t ${mode.section} pt-5`}>
                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-bold ${mode.heading} transition hover:text-emerald-600`}
                          >
                            View project →
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`text-sm font-bold ${mode.muted} transition hover:${isDark ? "text-white" : "text-slate-900"}`}
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
          <section className={`border-b ${mode.section} py-16 lg:py-20`}>
            <div className="grid gap-8 md:grid-cols-[180px_1fr]">
              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-emerald-600">
                  05
                </span>

                <h2 className={`mt-2 text-sm font-bold uppercase tracking-[0.16em] ${mode.muted}`}>
                  Education
                </h2>
              </div>

              <div className="grid max-w-3xl gap-5">
                {education.map((item) => (
                  <article
                    key={item._id}
                    className={`rounded-2xl border ${mode.card} p-6 shadow-sm transition hover:border-emerald-200 hover:shadow-md`}
                  >
                    <div className="flex gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-xs font-bold text-emerald-600">
                        EDU
                      </div>

                      <div>
                        <h3 className={`text-xl font-bold ${mode.heading}`}>
                          {item.degree}
                        </h3>

                        <p className="mt-1 text-sm font-semibold text-emerald-600">
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
          <section className="py-16 lg:py-20">
            <div className="grid gap-8 md:grid-cols-[180px_1fr]">
              <div>
                <span className="text-xs font-bold tracking-[0.18em] text-emerald-600">
                  06
                </span>

                <h2 className={`mt-2 text-sm font-bold uppercase tracking-[0.16em] ${mode.muted}`}>
                  Certifications
                </h2>
              </div>

              <div className="grid max-w-3xl gap-5 md:grid-cols-2">
                {certifications.map((item) => (
                  <article
                    key={item._id}
                    className={`group rounded-2xl border ${mode.card} p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                        ✓
                      </div>

                      {item.credentialUrl && (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs font-semibold ${mode.muted} transition hover:text-emerald-600`}
                        >
                          Verify ↗
                        </a>
                      )}
                    </div>

                    <h3 className="mt-5 font-bold text-slate-900">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm font-semibold text-emerald-600">
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
                        className={`mt-5 inline-block text-sm font-semibold ${mode.heading} transition hover:text-emerald-600`}
                      >
                        View credential →
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
      <footer className="bg-slate-950 text-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <p className="font-semibold">
              {portfolio.title}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Built with DevFolio
            </p>
          </div>

          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ModernProfessional;