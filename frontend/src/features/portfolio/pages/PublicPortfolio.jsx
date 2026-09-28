import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MinimalDeveloper from "../templates/MinimalDeveloper";
import ModernProfessional from "../templates/ModernProfessional";
import CreativePortfolio from "../templates/CreativePortfolio";

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

  switch (data.portfolio.template) {
  case "professional":
    return <ModernProfessional data={data} />;

  case "creative":
    return <CreativePortfolio data={data} />;

  case "minimal":
  default:
    return <MinimalDeveloper data={data} />;
}
};

export default PublicPortfolio;