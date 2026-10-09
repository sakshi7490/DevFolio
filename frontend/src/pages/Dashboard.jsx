
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FolderKanban,
  UserRound,
  Inbox,
  ArrowRight,
  ArrowUpRight,
  Globe,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import { getProfile } from "../services/user.service";
import WelcomeSection from "../components/dashboard/WelcomeSection";
import Spinner from "../components/common/Spinner";
import Alert from "../components/common/Alert";
import Button from "../components/common/Button";
import portfolioService from "../features/portfolio/portfolioService";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getProfile();
        setProfile(response.data);

        const portfolioResponse = await portfolioService.getPortfolios();
        setPortfolios(portfolioResponse.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) {
    return <Spinner label="Loading profile..." />;
  }

  if (error) {
    return (
      <div className="mx-auto max-w-md pt-16 text-center">
        <Alert type="error">{error}</Alert>
        <Button onClick={handleLogout} className="mt-4">
          Go to login
        </Button>
      </div>
    );
  }

  const hasUnpublishedPortfolio = portfolios.some(
    (portfolio) => portfolio.status !== "published"
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-10">
      <WelcomeSection user={profile} />

      {/* Portfolio publishing reminder */}
      {hasUnpublishedPortfolio && (
        <div className="relative overflow-hidden rounded-2xl border border-amber-200 bg-[#fffbef] p-5 sm:p-7">
          <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-amber-200 bg-white text-amber-700">
                <Globe size={23} strokeWidth={1.8} />
              </div>

              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
                  One more step
                </p>

                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  Your portfolio isn't public yet
                </h3>

                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">
                  Publish your portfolio to make it accessible to anyone
                  with its public link.
                </p>
              </div>
            </div>

            <Button
              onClick={() => navigate("/dashboard/portfolios")}
              className="shrink-0"
            >
              View Portfolios
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>

          <div className="pointer-events-none absolute -right-12 -top-16 h-44 w-44 rounded-full border-[24px] border-amber-100/70" />
        </div>
      )}

      {/* Dashboard shortcuts */}
      <section>
        <div className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Your workspace
          </p>

          <h2 className="mt-1 text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
            Everything in one place
          </h2>

          <p className="mt-1 text-sm leading-6 text-slate-500">
            Manage your portfolio and keep your professional presence up to date.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {/* Portfolios */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/portfolios")}
            className="group flex min-h-[245px] flex-col rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition-transform duration-300 group-hover:scale-105">
                <FolderKanban size={23} strokeWidth={1.8} />
              </div>

              <span className="text-xs font-medium tracking-widest text-stone-300">
                01
              </span>
            </div>

            <div className="mt-6 flex-1">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-800">
                Portfolios
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Create, edit and publish your projects, skills and experience
                in one professional space.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
              <span className="text-sm font-semibold text-emerald-700">
                Manage portfolios
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-500 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <ArrowUpRight size={17} />
              </span>
            </div>
          </button>

          {/* Account profile */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="group flex min-h-[245px] flex-col rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-stone-100 text-slate-700 transition-transform duration-300 group-hover:scale-105">
                <UserRound size={23} strokeWidth={1.8} />
              </div>

              <span className="text-xs font-medium tracking-widest text-stone-300">
                02
              </span>
            </div>

            <div className="mt-6 flex-1">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-800">
                Account profile
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Keep your personal information and professional identity
                up to date.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
              <span className="text-sm font-semibold text-emerald-700">
                Edit your profile
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-500 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <ArrowUpRight size={17} />
              </span>
            </div>
          </button>

          {/* Messages */}
          <button
            type="button"
            onClick={() => navigate("/dashboard/messages")}
            className="group flex min-h-[245px] flex-col rounded-2xl border border-stone-200 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 sm:p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 transition-transform duration-300 group-hover:scale-105">
                <Inbox size={23} strokeWidth={1.8} />
              </div>

              <span className="text-xs font-medium tracking-widest text-stone-300">
                03
              </span>
            </div>

            <div className="mt-6 flex-1">
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 transition-colors group-hover:text-emerald-800">
                Messages
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View and manage messages received through your portfolios.
              </p>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-stone-100 pt-4">
              <span className="text-sm font-semibold text-emerald-700">
                View messages
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-stone-50 text-stone-500 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                <ArrowUpRight size={17} />
              </span>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

