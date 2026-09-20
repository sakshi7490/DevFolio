import { useState } from "react";
import { useParams, Link } from "react-router-dom";
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
} from "lucide-react";

import PersonalDetailsForm from "../components/PersonalDetailsForm";
import AboutForm from "../components/AboutForm";
import SocialLinksForm from "../components/SocialLinksForm";
import SkillsSection from "../components/SkillsSection";
import EducationSection from "../components/EducationSection";
import CertificationSection from "../components/CertificationSection";
import ProjectsSection from "../components/ProjectsSection";
import ExperienceSection from "../components/ExperienceSection";

const SECTIONS = [
  { id: "personal", label: "Personal", icon: User, component: PersonalDetailsForm },
  { id: "about", label: "About", icon: FileText, component: AboutForm },
  { id: "social", label: "Social Links", icon: Share2, component: SocialLinksForm },
  { id: "skills", label: "Skills", icon: Code, component: SkillsSection },
  { id: "education", label: "Education", icon: GraduationCap, component: EducationSection },
  { id: "certifications", label: "Certifications", icon: Award, component: CertificationSection },
  { id: "projects", label: "Projects", icon: FolderGit2, component: ProjectsSection },
  { id: "experience", label: "Experience", icon: Briefcase, component: ExperienceSection },
];

const PortfolioEditor = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState("personal");
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

  const ActiveComponent =
    SECTIONS.find((s) => s.id === activeSection)?.component || PersonalDetailsForm;

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

        <Link
          to={`/dashboard/portfolios/${id}`}
          className="inline-flex items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:border-accent/40"
        >
          <span>Details</span>
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-3 lg:sticky lg:top-24">
          <p className="mb-2 px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted">
            Sections
          </p>
          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible">
            {SECTIONS.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
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
                  {isActive && <ChevronRight className="hidden h-4 w-4 lg:block" />}
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0">
          <ActiveComponent
            portfolioId={id}
            sectionState={sectionState[activeSection]}
            updateSectionState={(updates) =>
              updateSectionState(activeSection, updates)
            }
          />
        </main>
      </div>
    </div>
  );
};

export default PortfolioEditor;
