import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader2, ExternalLink } from "lucide-react";
import toast from "react-hot-toast";
import portfolioService from "../portfolioService";

const GithubImport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [portfolioSlug, setPortfolioSlug] = useState("");
  const [imported, setImported] = useState(false);

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [githubData, setGithubData] = useState(null);
  const [selectedRepositories, setSelectedRepositories] = useState([]);

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const response = await portfolioService.getPortfolio(id);
        setPortfolioSlug(response.data.slug);
      } catch (error) {
        console.error("Failed to load portfolio:", error);
      }
    };

    loadPortfolio();
  }, [id]);

  const handleConnect = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("GitHub username is required");
      return;
    }

    try {
      setLoading(true);

      const response = await portfolioService.connectGithub(username.trim());
      
      setGithubData(response.data);

      toast.success("GitHub connected successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to connect GitHub");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!id) {
      toast.error("Portfolio ID is missing");
      return;
    }

    if (!selectedRepositories.length) {
      toast.error("Select at least one repository");
      return;
    }

    try {
      const response = await portfolioService.importGithubRepositories(
        id,
        selectedRepositories,
      );

      toast.success(response.message || "Repositories imported successfully");

      setSelectedRepositories([]);
      setImported(true);
    } catch (error) {
      console.log("IMPORT ERROR:", error);
      console.log("SERVER RESPONSE:", error.response?.data);

      toast.error(
        error.response?.data?.message || "Failed to import repositories",
      );
    }
  };

  const toggleRepository = (repo) => {
    setSelectedRepositories((prev) => {
      const alreadySelected = prev.some(
        (item) => item.githubId === repo.githubId,
      );

      if (alreadySelected) {
        return prev.filter((item) => item.githubId !== repo.githubId);
      }

      return [...prev, repo];
    });
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
          GitHub Integration
        </p>

        <h1 className="mt-2 text-2xl font-semibold text-stone-900">
          Connect GitHub
        </h1>

        <p className="mt-2 text-sm text-stone-500">
          Connect your GitHub profile to import your repositories into your
          portfolio.
        </p>
      </div>

      {/* Connect GitHub */}
      <div className="rounded-xl border border-stone-200 bg-white p-6">
        <form
          onSubmit={handleConnect}
          className="flex flex-col gap-4 sm:flex-row sm:items-end"
        >
          <div className="flex-1">
            <label className="mb-2 block text-sm font-medium text-stone-700">
              GitHub Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="e.g. octocat"
              className="w-full rounded-lg border border-stone-200 px-4 py-2.5 text-sm outline-none transition focus:border-stone-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <span className="text-sm">→</span>
            )}

            {loading ? "Connecting..." : "Connect GitHub"}
          </button>
        </form>
      </div>

      {/* GitHub Profile + Repositories */}
      {githubData && (
        <>
          {/* GitHub Profile */}
          <div className="rounded-xl border border-stone-200 bg-white p-6">
            <div className="flex items-center gap-4">
              <img
                src={githubData.profile.avatar}
                alt={githubData.profile.username}
                className="h-16 w-16 rounded-full"
              />

              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-stone-900">
                  {githubData.profile.name || githubData.profile.username}
                </h2>

                <p className="text-sm text-stone-500">
                  @{githubData.profile.username}
                </p>

                {githubData.profile.bio && (
                  <p className="mt-1 text-sm text-stone-600">
                    {githubData.profile.bio}
                  </p>
                )}
              </div>
            </div>
          </div>


          
          {/* Repositories */}
          <div>
            {githubData?.languageStats &&
  Object.keys(githubData.languageStats).length > 0 && (
    <div className="mb-6 rounded-xl border border-stone-200 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-stone-900">
        Language Stats
      </h2>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(githubData.languageStats)
  .sort((a, b) => b[1] - a[1])
  .map(([language, count]) => (
    <div
      key={language}
      className="flex items-center justify-between rounded-lg bg-stone-50 px-4 py-3"
    >
      <span className="text-sm font-medium text-stone-700">
        {language}
      </span>

      <span className="text-xs text-stone-500">
        {count} {count === 1 ? "repository" : "repositories"}
      </span>
    </div>
  ))}
      </div>
    </div>
  )}

            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-stone-900">
                Repositories
              </h2>

              <span className="text-sm text-stone-500">
                {selectedRepositories.length} selected /{" "}
                {githubData.repositories?.length || 0} repositories
              </span>
            </div>

            {githubData.repositories?.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2">
                {githubData.repositories.map((repo) => (
                  <div
                    key={repo.githubId}
                    className="rounded-xl border border-stone-200 bg-white p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={selectedRepositories.some(
                            (item) => item.githubId === repo.githubId,
                          )}
                          onChange={() => toggleRepository(repo)}
                          className="mt-1 h-4 w-4 rounded border-stone-300"
                        />

                        <h3 className="font-semibold text-stone-900">
                          {repo.title}
                        </h3>
                      </div>

                      <a
                        href={repo.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-stone-400 transition hover:text-stone-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>

                    {repo.description && (
                      <p className="mt-2 text-sm leading-6 text-stone-600">
                        {repo.description}
                      </p>
                    )}

                    {repo.technologies?.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {repo.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full bg-stone-100 px-2.5 py-1 text-xs font-medium text-stone-600"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex gap-4 text-xs text-stone-500">
                      <span>⭐ {repo.stars}</span>
                      <span>Forks: {repo.forks}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-xl border border-stone-200 bg-white p-8 text-center">
                <p className="text-sm text-stone-500">
                  No public repositories found.
                </p>
              </div>
            )}

            {/* Import */}
            {selectedRepositories.length > 0 && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleImport}
                  className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  Import Selected ({selectedRepositories.length})
                </button>
              </div>
            )}

            {imported && portfolioSlug && (
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => navigate(`/portfolio/${portfolioSlug}`)}
                  className="rounded-lg bg-stone-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-stone-800"
                >
                  Go to Portfolio →
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GithubImport;
