import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MapPin,
  Globe,
  ExternalLink,
  ArrowUpRight,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  FolderGit2,
} from "lucide-react";

import portfolioService from "../portfolioService";
import Alert from "../../../components/common/Alert";

const PublicPortfolio = () => {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await portfolioService.getPublicPortfolio(slug);

      setData(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Portfolio not found"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [slug]);

  /* =========================
     Loading State
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f6f5f1] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
            <div className="h-1.5 animate-pulse bg-stone-200" />

            <div className="p-6 sm:p-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="h-28 w-28 animate-pulse rounded-2xl bg-stone-100 sm:h-32 sm:w-32" />

                <div className="flex-1">
                  <div className="h-8 w-64 animate-pulse rounded bg-stone-100" />

                  <div className="mt-3 h-5 w-80 max-w-full animate-pulse rounded bg-stone-100" />

                  <div className="mt-3 h-4 w-40 animate-pulse rounded bg-stone-100" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="space-y-6">
              <div className="h-48 animate-pulse rounded-2xl bg-white" />
              <div className="h-56 animate-pulse rounded-2xl bg-white" />
            </div>

            <div className="h-64 animate-pulse rounded-2xl bg-white" />
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     Error State
  ========================= */

  if (error) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-6">
      <div className="w-full max-w-md text-center">
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-stone-100 text-2xl">
            404
          </div>

          <h1 className="mt-5 font-display text-2xl font-medium text-ink">
            Portfolio not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-muted">
            This portfolio may not exist, or it may not be published yet.
          </p>

          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

  if (!data) {
    return null;
  }

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

  return (
    <div className="min-h-screen bg-[#f6f5f1] text-ink">
      {/* =========================
          Top Bar
      ========================= */}

      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-accent" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-stone-500">
                Portfolio
              </span>
            </div>

            <span className="hidden text-xs text-stone-400 sm:block">
              {portfolio.title}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* =========================
            Hero Section
        ========================= */}

        <section className="relative overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          {/* Accent line */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

          <div className="relative p-6 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-center">
              {/* Profile Image */}

              {personal?.profileImage ? (
                <img
                  src={personal.profileImage}
                  alt={personal.name || portfolio.title}
                  className="h-28 w-28 shrink-0 rounded-2xl border border-stone-200 object-cover shadow-sm sm:h-32 sm:w-32"
                />
              ) : (
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-stone-100 text-3xl font-semibold text-stone-500 sm:h-32 sm:w-32">
                  {(personal?.name || portfolio.title || "P")
                    .charAt(0)
                    .toUpperCase()}
                </div>
              )}

              {/* Profile Information */}

              <div className="min-w-0 flex-1">
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                  Developer
                </p>

                <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl lg:text-5xl">
                  {personal?.name || portfolio.title}
                </h1>

                {personal?.headline && (
                  <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
                    {personal.headline}
                  </p>
                )}

                {personal?.location && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-stone-500">
                    <MapPin className="h-4 w-4 text-accent" />
                    <span>{personal.location}</span>
                  </div>
                )}

                {/* Social Links */}

                <div className="mt-6 flex flex-wrap gap-2">
                  {social?.github && (
                    <a
                      href={social.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-white hover:text-ink"
                    >
                      <span className="text-xs font-bold">
                        GH
                      </span>

                      <span>GitHub</span>

                      <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
                    </a>
                  )}

                  {social?.linkedin && (
                    <a
                      href={social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-white hover:text-ink"
                    >
                      <span className="text-xs font-bold">
                        in
                      </span>

                      <span>LinkedIn</span>

                      <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
                    </a>
                  )}

                  {social?.website && (
                    <a
                      href={social.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-white hover:text-ink"
                    >
                      <Globe className="h-4 w-4" />

                      <span>Website</span>

                      <ExternalLink className="h-3.5 w-3.5 text-stone-400" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================
            Main Content
        ========================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* =========================
              Left Column
          ========================= */}

          <div className="min-w-0 space-y-6">
            {/* =========================
                About
            ========================= */}

            {(about?.content || portfolio.description) && (
              <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                    <Code2 className="h-4 w-4" />
                  </div>

                  <h2 className="text-lg font-semibold text-ink">
                    About
                  </h2>
                </div>

                <p className="max-w-3xl whitespace-pre-line text-sm leading-7 text-stone-600 sm:text-base">
                  {about?.content || portfolio.description}
                </p>
              </section>
            )}

            {/* =========================
                Experience
            ========================= */}

            {experience?.length > 0 && (
              <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                    <Briefcase className="h-4 w-4" />
                  </div>

                  <h2 className="text-lg font-semibold text-ink">
                    Experience
                  </h2>
                </div>

                <div className="space-y-6">
                  {experience.map((item, index) => (
                    <div
                      key={item._id}
                      className={`relative pl-6 ${
                        index !== experience.length - 1
                          ? "border-l border-stone-200 pb-2"
                          : ""
                      }`}
                    >
                      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-emerald-50" />

                      <h3 className="text-base font-semibold text-ink">
                        {item.position}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-stone-600">
                        {item.company}

                        {item.location &&
                          ` · ${item.location}`}
                      </p>

                      {item.description && (
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-stone-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* =========================
                Education
            ========================= */}

            {education?.length > 0 && (
              <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                    <GraduationCap className="h-4 w-4" />
                  </div>

                  <h2 className="text-lg font-semibold text-ink">
                    Education
                  </h2>
                </div>

                <div className="space-y-6">
                  {education.map((item, index) => (
                    <div
                      key={item._id}
                      className={`relative pl-6 ${
                        index !== education.length - 1
                          ? "border-l border-stone-200 pb-2"
                          : ""
                      }`}
                    >
                      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-emerald-50" />

                      <h3 className="text-base font-semibold text-ink">
                        {item.degree}
                      </h3>

                      <p className="mt-1 text-sm font-medium text-stone-600">
                        {item.institution}

                        {item.fieldOfStudy &&
                          ` · ${item.fieldOfStudy}`}
                      </p>

                      {item.description && (
                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-stone-600">
                          {item.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* =========================
                Projects
            ========================= */}

            {projects?.length > 0 && (
              <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-7">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                    <FolderGit2 className="h-4 w-4" />
                  </div>

                  <h2 className="text-lg font-semibold text-ink">
                    Projects
                  </h2>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className="group overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 transition duration-200 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md"
                    >
                      {project.image && (
                        <div className="overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="h-48 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      )}

                      <div className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <h3 className="text-base font-semibold text-ink">
                            {project.title}
                          </h3>

                          <ArrowUpRight className="h-4 w-4 shrink-0 text-stone-400 transition group-hover:text-accent" />
                        </div>

                        {project.description && (
                          <p className="mt-2 text-sm leading-6 text-stone-600">
                            {project.description}
                          </p>
                        )}

                        {project.technologies?.length > 0 && (
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.technologies.map(
                              (technology, index) => (
                                <span
                                  key={`${technology}-${index}`}
                                  className="rounded-lg border border-stone-200 bg-white px-2.5 py-1 text-xs font-medium text-stone-600"
                                >
                                  {technology}
                                </span>
                              ),
                            )}
                          </div>
                        )}

                        <div className="mt-5 flex flex-wrap gap-2">
                          {project.projectUrl && (
                            <a
                              href={project.projectUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-3 py-2 text-xs font-medium text-white transition hover:opacity-90"
                            >
                              Live Demo
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </a>
                          )}

                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-700 transition hover:border-stone-300"
                            >
                              <span className="text-[11px] font-bold">
                                GH
                              </span>

                              GitHub
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* =========================
              Right Sidebar
          ========================= */}

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {/* Skills */}

            {skills?.length > 0 && (
              <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                    <Code2 className="h-4 w-4" />
                  </div>

                  <h2 className="text-base font-semibold text-ink">
                    Skills
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill._id}
                      className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-xs font-medium text-stone-600"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}

            {certifications?.length > 0 && (
              <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                    <Award className="h-4 w-4" />
                  </div>

                  <h2 className="text-base font-semibold text-ink">
                    Certifications
                  </h2>
                </div>

                <div className="space-y-5">
                  {certifications.map((item) => (
                    <div
                      key={item._id}
                      className="border-b border-stone-100 pb-5 last:border-0 last:pb-0"
                    >
                      <h3 className="text-sm font-semibold text-ink">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-stone-500">
                        {item.issuer}
                      </p>

                      {item.description && (
                        <p className="mt-2 text-xs leading-5 text-stone-600">
                          {item.description}
                        </p>
                      )}

                      {item.credentialUrl && (
                        <a
                          href={item.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-accent hover:underline"
                        >
                          View credential
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </aside>
        </div>

        {/* =========================
            Footer
        ========================= */}

        <footer className="mt-10 border-t border-stone-200 py-8 text-center">
          <p className="text-sm text-stone-400">
            {portfolio.title}
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PublicPortfolio;