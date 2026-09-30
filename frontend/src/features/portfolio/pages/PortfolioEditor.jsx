import { useEffect, useState } from "react";
import {  useNavigate, useParams, useSearchParams, Link } from "react-router-dom";

import {
  User,
  FileText,
  Share2,
  Code,
  GraduationCap,
  Award,
  FolderGit2,
  Briefcase,
  ExternalLink,
  ChevronRight,
  ClipboardCheck,
} from "lucide-react";

import PersonalDetailsForm from "../components/PersonalDetailsForm";
import AboutForm from "../components/AboutForm";
import SocialLinksForm from "../components/SocialLinksForm";
import SkillsSection from "../components/SkillsSection";
import EducationSection from "../components/EducationSection";
import CertificationSection from "../components/CertificationSection";
import ProjectsSection from "../components/ProjectsSection";
import ExperienceSection from "../components/ExperienceSection";
import portfolioService from "../portfolioService";

const SECTIONS = [
  {
    id: "personal",
    label: "Personal",
    icon: User,
    component: PersonalDetailsForm,
  },
  { id: "about", label: "About", icon: FileText, component: AboutForm },
  {
    id: "social",
    label: "Social Links",
    icon: Share2,
    component: SocialLinksForm,
  },
  { id: "skills", label: "Skills", icon: Code, component: SkillsSection },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    component: EducationSection,
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    component: CertificationSection,
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderGit2,
    component: ProjectsSection,
  },
  {
    id: "experience",
    label: "Experience",
    icon: Briefcase,
    component: ExperienceSection,
  },
];

const PortfolioEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();

const [activeSection, setActiveSection] = useState(
  searchParams.get("section") || "personal",
);
  const [isDirty, setIsDirty] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);
  const [completedSections, setCompletedSections] = useState({});

  const [sectionState, setSectionState] = useState({
    personal: { data: {}, isDirty: false, isSaving: false, error: "" },
    about: { data: {}, isDirty: false, isSaving: false, error: "" },
    social: { data: {}, isDirty: false, isSaving: false, error: "" },
    skills: { data: [], isDirty: false, isSaving: false, error: "" },
    education: { data: [], isDirty: false, isSaving: false, error: "" },
    certifications: { data: [], isDirty: false, isSaving: false, error: "" },
    projects: { data: [], isDirty: false, isSaving: false, error: "" },
    experience: { data: [], isDirty: false, isSaving: false, error: "" },
  });

  const updateSectionState = (section, updates) => {
    setSectionState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...updates,
      },
    }));
  };

  useEffect(() => {
    const checkSectionCompletion = async () => {
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
        personalRes,
        aboutRes,
        socialRes,
        skillsRes,
        educationRes,
        certificationsRes,
        projectsRes,
        experienceRes,
      ] = results;

      setCompletedSections({
        personal:
          personalRes.status === "fulfilled" &&
          Boolean(
            personalRes.value.data?.name && personalRes.value.data?.headline,
          ),

        about:
          aboutRes.status === "fulfilled" &&
          Boolean(aboutRes.value.data?.content?.trim()),

        social:
          socialRes.status === "fulfilled" &&
          Boolean(
            socialRes.value.data &&
            Object.values(socialRes.value.data).some(
              (value) => typeof value === "string" && value.trim(),
            ),
          ),

        skills:
          skillsRes.status === "fulfilled" &&
          Array.isArray(skillsRes.value.data) &&
          skillsRes.value.data.length > 0,

        education:
          educationRes.status === "fulfilled" &&
          Array.isArray(educationRes.value.data) &&
          educationRes.value.data.length > 0,

        certifications:
          certificationsRes.status === "fulfilled" &&
          Array.isArray(certificationsRes.value.data) &&
          certificationsRes.value.data.length > 0,

        projects:
          projectsRes.status === "fulfilled" &&
          Array.isArray(projectsRes.value.data) &&
          projectsRes.value.data.length > 0,

        experience:
          experienceRes.status === "fulfilled" &&
          Array.isArray(experienceRes.value.data) &&
          experienceRes.value.data.length > 0,
      });
    };

    checkSectionCompletion();
  }, [id]);
  const ActiveComponent =
    SECTIONS.find((s) => s.id === activeSection)?.component ||
    PersonalDetailsForm;

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-stone-200 pb-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
            Editor
          </p>

          <h1 className="mt-1 font-display text-3xl font-medium tracking-tight text-ink">
            Edit portfolio
          </h1>

          <p className="mt-1 text-sm text-muted">
            Manage your personal profile, experience, and project highlights.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate(`/dashboard/portfolios/${id}/review`)}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
        >
          <ClipboardCheck className="h-4 w-4" />
          Review Portfolio
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-3 lg:sticky lg:top-6">
          <p className="mb-2 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted">
            Sections
          </p>
          <nav className="grid grid-cols-2 gap-1 lg:block lg:space-y-1">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    if (section.id === activeSection) return;

                    if (isDirty) {
                      setPendingSection(section.id);
                      return;
                    }

                    setActiveSection(section.id);
                  }}
                  className={`flex shrink-0 items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-navy text-white"
                      : "text-stone-600 hover:bg-canvas hover:text-ink"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </span>
                  <div className="flex items-center gap-2">
                    {completedSections[section.id] && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                        ✓
                      </span>
                    )}

                    {isActive && (
                      <ChevronRight className="h-4 w-4 text-cyan-400/70" />
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <ActiveComponent
            portfolioId={id}
            onDirtyChange={setIsDirty}
            sectionState={sectionState[activeSection]}
            updateSectionState={(updates) =>
              updateSectionState(activeSection, updates)
            }
          />
        </main>
      </div>
      {pendingSection && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-6 shadow-2xl">
            {/* Icon */}
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <span className="text-lg">!</span>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-lg font-semibold text-ink">
                Unsaved changes
              </h2>

              <p className="mt-2 text-sm leading-6 text-muted">
                You have unsaved changes in this section. If you leave now, your
                changes may be lost.
              </p>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingSection(null)}
                className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-medium text-ink transition hover:bg-stone-50"
              >
                Stay here
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsDirty(false);
                  setActiveSection(pendingSection);
                  setPendingSection(null);
                }}
                className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Leave without saving
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioEditor;
