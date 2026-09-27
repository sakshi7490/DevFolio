import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  ExternalLink,
  CalendarDays,
  Code2,
  FileText,
  Image as ImageIcon,
  MapPin,
  GraduationCap,
  Award,
  Briefcase,
  FolderGit2,
} from "lucide-react";

import portfolioService from "../portfolioService";
import Button from "../../../components/common/Button";
import Alert from "../../../components/common/Alert";

const PortfolioDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =====================================================
     Fetch Portfolio + All Sections
  ===================================================== */

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError("");

      const portfolioResponse = await portfolioService.getPortfolio(id);

      const portfolio = portfolioResponse.data;

      const results = await Promise.allSettled([
        portfolioService.getPersonal(id),
        portfolioService.getAbout(id),
        portfolioService.getSocial(id),
        portfolioService.getSkills(id),
        portfolioService.getEducation(id),
        portfolioService.getCertifications(id),
        portfolioService.getProjects(id),
        portfolioService.getExperiences(id),
      ]);

      const [
        personalResult,
        aboutResult,
        socialResult,
        skillsResult,
        educationResult,
        certificationsResult,
        projectsResult,
        experienceResult,
      ] = results;

      setData({
        portfolio,

        personal:
          personalResult.status === "fulfilled"
            ? personalResult.value.data
            : null,

        about:
          aboutResult.status === "fulfilled"
            ? aboutResult.value.data
            : null,

        social:
          socialResult.status === "fulfilled"
            ? socialResult.value.data
            : null,

        skills:
          skillsResult.status === "fulfilled"
            ? skillsResult.value.data || []
            : [],

        education:
          educationResult.status === "fulfilled"
            ? educationResult.value.data || []
            : [],

        certifications:
          certificationsResult.status === "fulfilled"
            ? certificationsResult.value.data || []
            : [],

        projects:
          projectsResult.status === "fulfilled"
            ? projectsResult.value.data || []
            : [],

        experience:
          experienceResult.status === "fulfilled"
            ? experienceResult.value.data || []
            : [],
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to load portfolio"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, [id]);

  /* =====================================================
     Loading State
  ===================================================== */

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 h-5 w-40 animate-pulse rounded bg-stone-200" />

        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">
          <div className="h-64 animate-pulse bg-stone-100 sm:h-80" />

          <div className="space-y-6 p-6 sm:p-8 lg:p-10">
            <div className="h-10 w-2/3 animate-pulse rounded bg-stone-100" />

            <div className="h-4 w-48 animate-pulse rounded bg-stone-100" />

            <div className="h-24 animate-pulse rounded-xl bg-stone-100" />

            <div className="h-24 animate-pulse rounded-xl bg-stone-100" />

            <div className="h-32 animate-pulse rounded-xl bg-stone-100" />
          </div>
        </div>
      </div>
    );
  }

  /* =====================================================
     Error State
  ===================================================== */

  if (error) {
    return (
      <div className="mx-auto max-w-lg pt-10 text-center">
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <Alert type="error">{error}</Alert>

          <Button
            variant="secondary"
            className="mt-5"
            onClick={() => navigate("/dashboard/portfolios")}
          >
            Back to portfolios
          </Button>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  /* =====================================================
     Extract Data
  ===================================================== */

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

  /* =====================================================
     Public URL
     IMPORTANT: portfolio is now defined before using it
  ===================================================== */

  const publicUrl = `${window.location.origin}/portfolio/${portfolio.slug}`;

  /* =====================================================
     Helpers
  ===================================================== */

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const formatFullDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /* =====================================================
     Copy Public URL
  ===================================================== */

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl);
      toast.success("Public portfolio URL copied!");
    } catch (error) {
      console.error("Failed to copy URL", error);
    }
  };

  /* =====================================================
     Main UI
  ===================================================== */

  return (
    <div className="mx-auto max-w-5xl">

      {/* =================================================
          Back Navigation
      ================================================= */}

      <button
        onClick={() => navigate("/dashboard/portfolios")}
        className="group mb-6 inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to portfolios
      </button>

      {/* =================================================
          Main Portfolio Card
      ================================================= */}

      <div className="overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm">

        {/* =================================================
            Featured Image
        ================================================= */}

        {portfolio.featuredImage ? (
          <div className="relative h-64 overflow-hidden bg-stone-100 sm:h-80 lg:h-96">
            <img
              src={portfolio.featuredImage}
              alt={portfolio.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        ) : (
          <div className="flex h-56 items-center justify-center border-b border-stone-200 bg-gradient-to-br from-stone-100 via-[#f6f5f1] to-emerald-50 sm:h-64">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-white text-stone-400 shadow-sm">
                <ImageIcon className="h-6 w-6" />
              </div>

              <p className="mt-3 text-sm font-medium text-stone-500">
                No preview image
              </p>

              <p className="mt-1 text-xs text-stone-400">
                Add a featured image to personalize your portfolio
              </p>
            </div>
          </div>
        )}

        {/* =================================================
            Hero Content
        ================================================= */}

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

            <div className="flex min-w-0 gap-5">

              {personal?.profileImage && (
                <img
                  src={personal.profileImage}
                  alt={personal.name || portfolio.title}
                  className="h-20 w-20 shrink-0 rounded-2xl border border-stone-200 object-cover shadow-sm sm:h-24 sm:w-24"
                />
              )}

              <div className="min-w-0">

                <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
                  Portfolio
                </p>

                <h1 className="font-display text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                  {personal?.name || portfolio.title}
                </h1>

                {personal?.headline && (
                  <p className="mt-2 text-base text-stone-500 sm:text-lg">
                    {personal.headline}
                  </p>
                )}

                {personal?.location && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-stone-500">
                    <MapPin className="h-4 w-4 text-accent" />
                    {personal.location}
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 text-sm text-stone-400">
                  <CalendarDays className="h-4 w-4" />
                  Created on {formatFullDate(portfolio.createdAt)}
                </div>

              </div>
            </div>

            {/* Draft Status */}

            <div className="inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-amber-100 bg-amber-50 px-3.5 py-1.5 text-xs font-semibold text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Draft
            </div>

          </div>

          {/* =================================================
              Social Links
          ================================================= */}

          {(social?.github ||
            social?.linkedin ||
            social?.website) && (
            <div className="mt-7 flex flex-wrap gap-2.5">

              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  GitHub
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  LinkedIn
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

              {social.website && (
                <a
                  href={social.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm font-medium text-stone-600 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                >
                  Website
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}

            </div>
          )}
        </div>

        {/* =================================================
            Main Sections
        ================================================= */}

        <div className="border-t border-stone-100 px-6 sm:px-8 lg:px-10">

          {/* =================================================
              About
          ================================================= */}

          {(about?.content || portfolio.description) && (
            <section className="border-b border-stone-100 py-9">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <FileText className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    About
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-ink">
                    About me
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-7 text-stone-600 sm:text-base">
                {about?.content || portfolio.description}
              </p>

            </section>
          )}

          {/* =================================================
              Skills
          ================================================= */}

          {skills?.length > 0 && (
            <section className="border-b border-stone-100 py-9">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <Code2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Skills
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-ink">
                    What I work with
                  </h2>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {skills.map((skill) => (
                  <div
                    key={skill._id}
                    className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2.5"
                  >
                    <p className="text-sm font-medium text-stone-700">
                      {skill.name}
                    </p>

                    {skill.level && (
                      <p className="mt-0.5 text-[11px] text-stone-400">
                        {skill.level}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </section>
          )}

          {/* =================================================
              Experience
          ================================================= */}

          {experience?.length > 0 && (
            <section className="border-b border-stone-100 py-9">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <Briefcase className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Experience
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-ink">
                    Work experience
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {experience.map((item) => (
                  <div
                    key={item._id}
                    className="relative border-l-2 border-emerald-100 pl-5"
                  >
                    <div className="absolute -left-[7px] top-1.5 h-3 w-3 rounded-full border-2 border-white bg-accent" />

                    <h3 className="text-base font-semibold text-ink sm:text-lg">
                      {item.position}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-stone-600">
                      {item.company}
                      {item.location && ` · ${item.location}`}
                    </p>

                    {(item.startDate ||
                      item.endDate ||
                      item.isCurrent) && (
                      <p className="mt-1 text-xs text-stone-400">
                        {formatDate(item.startDate)}
                        {" — "}
                        {item.isCurrent
                          ? "Present"
                          : formatDate(item.endDate)}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-stone-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </section>
          )}

          {/* =================================================
              Education
          ================================================= */}

          {education?.length > 0 && (
            <section className="border-b border-stone-100 py-9">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <GraduationCap className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Education
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-ink">
                    Academic background
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                {education.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5"
                  >
                    <h3 className="text-base font-semibold text-ink sm:text-lg">
                      {item.degree}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-stone-600">
                      {item.institution}
                      {item.fieldOfStudy &&
                        ` · ${item.fieldOfStudy}`}
                    </p>

                    {(item.startDate || item.endDate) && (
                      <p className="mt-2 text-xs text-stone-400">
                        {formatDate(item.startDate)}
                        {" — "}
                        {formatDate(item.endDate)}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-3 whitespace-pre-line text-sm leading-7 text-stone-600">
                        {item.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>

            </section>
          )}

          {/* =================================================
              Certifications
          ================================================= */}

          {certifications?.length > 0 && (
            <section className="border-b border-stone-100 py-9">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <Award className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Certifications
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-ink">
                    Certifications & credentials
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {certifications.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-2xl border border-stone-200 bg-stone-50/70 p-5"
                  >
                    <h3 className="font-semibold text-ink">
                      {item.name}
                    </h3>

                    <p className="mt-1 text-sm text-stone-500">
                      {item.issuer}
                    </p>

                    {item.issueDate && (
                      <p className="mt-2 text-xs text-stone-400">
                        Issued {formatDate(item.issueDate)}
                      </p>
                    )}

                    {item.description && (
                      <p className="mt-3 text-sm leading-6 text-stone-600">
                        {item.description}
                      </p>
                    )}

                    {item.credentialUrl && (
                      <a
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                      >
                        View credential
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>

            </section>
          )}

          {/* =================================================
              Projects
          ================================================= */}

          {projects?.length > 0 && (
            <section className="border-b border-stone-100 py-9">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <FolderGit2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Projects
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-ink">
                    Featured work
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {projects.map((project) => (
                  <article
                    key={project._id}
                    className="overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:-translate-y-0.5 hover:shadow-md"
                  >

                    {project.image ? (
                      <div className="h-48 overflow-hidden bg-stone-100">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                        />
                      </div>
                    ) : (
                      <div className="flex h-32 items-center justify-center bg-gradient-to-br from-stone-100 to-emerald-50">
                        <FolderGit2 className="h-7 w-7 text-stone-300" />
                      </div>
                    )}

                    <div className="p-5">

                      <h3 className="text-lg font-semibold text-ink">
                        {project.title}
                      </h3>

                      {project.description && (
                        <p className="mt-2 line-clamp-4 text-sm leading-6 text-stone-600">
                          {project.description}
                        </p>
                      )}

                      {project.technologies?.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {project.technologies.map(
                            (technology, index) => (
                              <span
                                key={`${technology}-${index}`}
                                className="rounded-lg bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
                              >
                                {technology}
                              </span>
                            ),
                          )}
                        </div>
                      )}

                      <div className="mt-5 flex flex-wrap gap-4">

                        {project.projectUrl && (
                          <a
                            href={project.projectUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                          >
                            Live project
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600 hover:text-ink hover:underline"
                          >
                            GitHub
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}

                      </div>
                    </div>
                  </article>
                ))}
              </div>

            </section>
          )}

          {/* =================================================
              Portfolio Technologies
          ================================================= */}

          {portfolio.technologies?.length > 0 && (
            <section className="py-9">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-accent">
                  <Code2 className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                    Technologies
                  </p>

                  <h2 className="mt-0.5 text-lg font-semibold text-ink">
                    Portfolio technologies
                  </h2>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2.5">
                {portfolio.technologies.map(
                  (technology, index) => (
                    <span
                      key={`${technology}-${index}`}
                      className="rounded-xl border border-stone-200 bg-stone-50 px-3.5 py-2 text-sm font-medium text-stone-600"
                    >
                      {technology}
                    </span>
                  ),
                )}
              </div>

            </section>
          )}

          {/* =================================================
              Actions
          ================================================= */}

          <div className="mt-8 flex flex-wrap gap-3 border-t border-stone-100 pt-6">
  {portfolio.liveUrl && (
    <a
      href={portfolio.liveUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button>View live</Button>
    </a>
  )}

  {portfolio.githubUrl && (
    <a
      href={portfolio.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button variant="secondary">GitHub</Button>
    </a>
  )}

  <Button
    variant="secondary"
    onClick={handleCopyUrl}
  >
    Copy public URL
  </Button>

  {portfolio.status === "published" && (
    <a
      href={publicUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Button>View public portfolio</Button>
    </a>
  )}

  <Button
    variant="ghost"
    onClick={() => navigate("/dashboard/portfolios")}
  >
    Back
  </Button>
</div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;