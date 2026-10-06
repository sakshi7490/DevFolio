import {  useState } from "react";
import axios from "axios";

import {
  collectSocialLinks,
  fontClasses,
  formatDate,
  formatDateRange,
} from "./templateHelpers";

const themeColors = {
  orange: {
    text: "text-orange-500",
    bg: "bg-orange-500",
    hover: "hover:bg-orange-400",
    border: "border-orange-400/40",
    soft: "bg-orange-500/10",
    glow: "from-orange-400/25 via-amber-300/10 to-transparent",
    focus: "focus-visible:outline-orange-500",
  },
  blue: {
    text: "text-sky-500",
    bg: "bg-sky-500",
    hover: "hover:bg-sky-400",
    border: "border-sky-400/40",
    soft: "bg-sky-500/10",
    glow: "from-sky-400/25 via-indigo-300/10 to-transparent",
    focus: "focus-visible:outline-sky-500",
  },
  green: {
    text: "text-teal-500",
    bg: "bg-teal-500",
    hover: "hover:bg-teal-400",
    border: "border-teal-400/40",
    soft: "bg-teal-500/10",
    glow: "from-teal-400/25 via-emerald-300/10 to-transparent",
    focus: "focus-visible:outline-teal-500",
  },
  purple: {
    text: "text-fuchsia-500",
    bg: "bg-fuchsia-500",
    hover: "hover:bg-fuchsia-400",
    border: "border-fuchsia-400/40",
    soft: "bg-fuchsia-500/10",
    glow: "from-fuchsia-400/20 via-violet-300/10 to-transparent",
    focus: "focus-visible:outline-fuchsia-500",
  },
  red: {
    text: "text-rose-500",
    bg: "bg-rose-500",
    hover: "hover:bg-rose-400",
    border: "border-rose-400/40",
    soft: "bg-rose-500/10",
    glow: "from-rose-400/25 via-orange-300/10 to-transparent",
    focus: "focus-visible:outline-rose-500",
  },
};

const CreativePortfolio = ({ data = {} }) => {
  const portfolio = data.portfolio || {};
  const personal = data.personal || {};
  const about = data.about || {};
  const social = data.social || {};
  const skills = data.skills || [];
  const education = data.education || [];
  const certifications = data.certifications || [];
  const projects = data.projects || [];
  const experience = data.experience || [];

  const theme = themeColors[portfolio.themeColor || "orange"];
  const fontClass = fontClasses[portfolio.font || "inter"];
  const isDark = (portfolio.themeMode || "dark") === "dark";
  const socialLinks = collectSocialLinks(social);
  const displayName = personal.name || portfolio.title || "Creative";

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

  const resumeTrackingUrl = portfolio.resumeUrl
  ? `http://localhost:5000/api/v1/portfolios/public/${portfolio.slug}/resume`
  : "";

  const mode = isDark
    ? {
        page: "bg-[#0c0b10] text-stone-100",
        muted: "text-stone-400",
        heading: "text-white",
        card: "bg-white/5 border-white/10",
        wash: "bg-white/[0.03]",
        line: "border-white/10",
      }
    : {
        page: "bg-[#f7f3ee] text-stone-900",
        muted: "text-stone-500",
        heading: "text-stone-950",
        card: "bg-white/70 border-stone-200/80",
        wash: "bg-white/50",
        line: "border-stone-200",
      };

  return (
    <div className={`relative min-h-screen overflow-x-hidden ${fontClass} ${mode.page}`}>
      <div
        className={`pointer-events-none absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-gradient-to-br ${theme.glow} blur-3xl`}
        aria-hidden="true"
      />
      <div
        className={`pointer-events-none absolute -right-16 top-[36rem] h-72 w-72 rounded-[40%] bg-gradient-to-tl ${theme.glow} blur-3xl`}
        aria-hidden="true"
      />

      <header className="relative mx-auto max-w-6xl px-5 pb-8 pt-8 sm:px-8 sm:pt-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className={`text-xs font-semibold uppercase tracking-[0.28em] ${theme.text}`}>
            {personal.headline || "Creative Professional"}
          </p>
          {(socialLinks.length > 0 || portfolio.resumeUrl) && (
            <nav aria-label="Profile links" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {socialLinks.slice(0, 3).map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${mode.muted} transition hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                >
                  {link.label}
                </a>
              ))}
              
            </nav>
          )}
        </div>
      </header>

      <section className="relative mx-auto max-w-6xl px-5 pb-20 sm:px-8 lg:pb-28">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div>
            <h1 className={`max-w-4xl text-[3.1rem] font-semibold leading-[0.92] tracking-[-0.05em] ${mode.heading} sm:text-7xl lg:text-[6.2rem]`}>
              {displayName}
              <span className={theme.text}>.</span>
            </h1>
            {portfolio.description && (
              <p className={`mt-8 max-w-xl text-lg leading-8 ${mode.muted}`}>
                {portfolio.description}
              </p>
            )}
            {personal.location && (
              <p className={`mt-5 text-sm ${mode.muted}`}>{personal.location}</p>
            )}
            {(social.github || social.linkedin || portfolio.resumeUrl) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {portfolio.resumeUrl && (
                  <a
                    href={resumeTrackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full ${theme.bg} px-6 py-2.5 text-sm font-semibold text-white transition ${theme.hover} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                  >
                    Download Resume
                  </a>
                )}
                {social.github && (
                  <a
                    href={social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border ${mode.card} px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                  >
                    GitHub
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border ${mode.card} px-5 py-2.5 text-sm font-medium backdrop-blur transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                  >
                    LinkedIn
                  </a>
                )}
              </div>
            )}
          </div>

          {personal.profileImage && (
            <div className="relative mx-auto w-fit lg:mx-0 lg:justify-self-end">
              <div
                className={`absolute -left-6 -top-6 h-20 w-20 rounded-full ${theme.soft}`}
                aria-hidden="true"
              />
              <div
                className={`absolute -bottom-5 -right-4 h-16 w-24 rotate-12 rounded-3xl ${theme.soft}`}
                aria-hidden="true"
              />
              <img
                src={personal.profileImage}
                alt={personal.name || portfolio.title}
                className={`relative h-52 w-44 -rotate-3 rounded-[2rem] object-cover shadow-2xl ring-1 ${mode.line} sm:h-64 sm:w-52`}
              />
            </div>
          )}
        </div>
      </section>

      <main>
        {(about.content || portfolio.description) && (
          <section className={`relative border-y ${mode.line} ${mode.wash}`}>
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-24">
              <div>
                <p className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${theme.text}`}>
                  About
                </p>
                <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${mode.heading} sm:text-5xl`}>
                  The story.
                </h2>
              </div>
              <p className={`text-lg leading-9 ${mode.muted}`}>
                {about.content || portfolio.description}
              </p>
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${theme.text}`}>
              Skills
            </p>
            <h2 className={`mt-4 max-w-md text-4xl font-semibold tracking-tight ${mode.heading} sm:text-5xl`}>
              Tools in motion.
            </h2>
            <div className="mt-10 flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={skill._id || skill.name || index}
                  className={`rounded-full border px-5 py-2.5 text-sm font-medium ${mode.card} ${index % 3 === 0 ? theme.text : ""} ${index % 4 === 0 ? "sm:text-base sm:px-6 sm:py-3" : ""}`}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {experience.length > 0 && (
          <section className={`border-y ${mode.line} ${mode.wash}`}>
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${theme.text}`}>
                Experience
              </p>
              <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${mode.heading} sm:text-5xl`}>
                Path so far.
              </h2>
              <div className="mt-12 space-y-0">
                {experience.map((item, index) => (
                  <article
                    key={item._id || index}
                    className={`grid gap-4 border-t py-8 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-10 ${mode.line}`}
                  >
                    <p className={`text-sm ${theme.text}`}>
                      {formatDateRange(item.startDate, item.endDate, {
                        presentIfOpen: item.isCurrent || !item.endDate,
                      })}
                    </p>
                    <div>
                      <h3 className={`text-2xl font-semibold tracking-tight ${mode.heading}`}>
                        {item.position}
                      </h3>
                      <p className={`mt-1 text-sm ${mode.muted}`}>
                        {item.company}
                        {item.location && ` · ${item.location}`}
                        {item.isCurrent && " · Current"}
                      </p>
                      {item.description && (
                        <p className={`mt-4 max-w-2xl leading-7 ${mode.muted}`}>{item.description}</p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {projects.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${theme.text}`}>
              Projects
            </p>
            <h2 className={`mt-4 text-4xl font-semibold tracking-tight ${mode.heading} sm:text-5xl`}>
              Selected work.
            </h2>
            <div className="mt-12 space-y-16 lg:space-y-24">
              {projects.map((project, index) => {
                const reverse = index % 2 === 1;
                return (
                  <article
                    key={project._id || index}
                    className={`grid items-center gap-8 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
                  >
                    {project.image ? (
                      <div className={`overflow-hidden rounded-[1.75rem] border ${mode.card} ${reverse ? "lg:rotate-1" : "lg:-rotate-1"}`}>
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-64 w-full object-cover transition duration-500 hover:scale-[1.03] sm:h-80"
                        />
                      </div>
                    ) : (
                      <div
                        className={`flex h-64 items-end rounded-[1.75rem] border p-8 sm:h-80 ${mode.card} ${theme.soft} ${reverse ? "lg:rotate-1" : "lg:-rotate-1"}`}
                      >
                        <span className={`text-6xl font-semibold tracking-tight ${theme.text}`}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                    )}
                    <div>
                      <h3 className={`text-3xl font-semibold tracking-tight ${mode.heading}`}>
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className={`mt-4 text-base leading-7 ${mode.muted}`}>{project.description}</p>
                      )}
                      {project.technologies?.length > 0 && (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.technologies.map((technology, techIndex) => (
                            <span
                              key={`${technology}-${techIndex}`}
                              className={`rounded-full border px-3 py-1 text-xs ${mode.card} ${mode.muted}`}
                            >
                              {technology}
                            </span>
                          ))}
                        </div>
                      )}
                      {(project.projectUrl || project.githubUrl) && (
                        <div className="mt-6 flex flex-wrap gap-5 text-sm font-semibold">
                          {project.projectUrl && (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${theme.text} underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                            >
                              Live project
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`${mode.muted} underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                            >
                              GitHub
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}

        {education.length > 0 && (
          <section className={`border-y ${mode.line} ${mode.wash}`}>
            <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${theme.text}`}>
                Education
              </p>
              <div className="mt-10 grid gap-6 md:grid-cols-2">
                {education.map((item, index) => (
                  <article
                    key={item._id || index}
                    className={`rounded-[1.75rem] border p-7 ${mode.card} backdrop-blur`}
                  >
                    <h3 className={`text-2xl font-semibold tracking-tight ${mode.heading}`}>
                      {item.degree}
                    </h3>
                    <p className={`mt-2 text-sm ${theme.text}`}>
                      {item.institution}
                      {item.fieldOfStudy && (
                        <span className={mode.muted}> · {item.fieldOfStudy}</span>
                      )}
                    </p>
                    {(item.startDate || item.endDate) && (
                      <p className={`mt-2 text-xs ${mode.muted}`}>
                        {formatDateRange(item.startDate, item.endDate)}
                      </p>
                    )}
                    {item.description && (
                      <p className={`mt-4 leading-7 ${mode.muted}`}>{item.description}</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {certifications.length > 0 && (
          <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            <p className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${theme.text}`}>
              Certifications
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((item, index) => (
                <article
                  key={item._id || index}
                  className={`rounded-[1.5rem] border p-6 transition hover:-translate-y-1 ${mode.card}`}
                >
                  <h3 className={`font-semibold ${mode.heading}`}>{item.name}</h3>
                  <p className={`mt-1 text-sm ${theme.text}`}>
                    {item.issuer}
                    {item.issueDate && (
                      <span className={mode.muted}> · {formatDate(item.issueDate)}</span>
                    )}
                  </p>
                  {item.description && (
                    <p className={`mt-3 text-sm leading-6 ${mode.muted}`}>{item.description}</p>
                  )}
                  {item.credentialUrl && (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`mt-4 inline-block text-sm font-semibold ${theme.text} focus-visible:outline-2 focus-visible:outline-offset-4 ${theme.focus}`}
                    >
                      Verify
                    </a>
                  )}
                </article>
              ))}
            </div>
          </section>
        )}
      </main>


              <section className={`border-y ${mode.line} ${mode.wash}`}>
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
          <p
            className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${theme.text}`}
          >
            Contact
          </p>

          <h2
            className={`mt-4 text-4xl font-semibold tracking-tight ${mode.heading} sm:text-5xl`}
          >
            Let's connect.
          </h2>

          <p className={`mt-4 max-w-xl leading-7 ${mode.muted}`}>
            Have an opportunity, idea, or just want to say hello? Send a message.
          </p>

          <form
            onSubmit={handleContactSubmit}
            className="mt-10 max-w-2xl space-y-4"
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
              className={`w-full rounded-2xl border px-5 py-3.5 text-sm outline-none ${mode.card} ${mode.heading}`}
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
              className={`w-full rounded-2xl border px-5 py-3.5 text-sm outline-none ${mode.card} ${mode.heading}`}
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
              className={`w-full rounded-2xl border px-5 py-3.5 text-sm outline-none ${mode.card} ${mode.heading}`}
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
              className={`w-full rounded-2xl border px-5 py-3.5 text-sm outline-none ${mode.card} ${mode.heading}`}
            />

            <button
              type="submit"
              disabled={contactStatus.loading}
              className={`rounded-full ${theme.bg} px-6 py-3 text-sm font-semibold text-white transition ${theme.hover} disabled:opacity-50`}
            >
              {contactStatus.loading ? "Sending..." : "Send Message"}
            </button>

            {contactStatus.success && (
              <p className="text-sm text-emerald-500">
                {contactStatus.success}
              </p>
            )}

            {contactStatus.error && (
              <p className="text-sm text-rose-500">
                {contactStatus.error}
              </p>
            )}
          </form>
        </div>
      </section>

      <footer className={`relative overflow-hidden border-t ${mode.line}`}>
        <div
          className={`pointer-events-none absolute -bottom-24 right-0 h-48 w-48 rounded-full bg-gradient-to-br ${theme.glow} blur-3xl`}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col gap-3 px-5 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-8">
          <div>
            <p className={`text-2xl font-semibold tracking-tight ${mode.heading}`}>
              {portfolio.title}
            </p>
            <p className={`mt-2 text-sm ${mode.muted}`}>Built with DevFolio</p>
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
