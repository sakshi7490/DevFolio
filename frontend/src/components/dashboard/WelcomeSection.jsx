import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WelcomeSection = ({ user }) => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1b1d29] to-[#151720] p-6 lg:p-8">
      <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-purple-600/10 blur-3xl" />

      <div className="relative max-w-2xl">
        <p className="mb-2 text-sm text-gray-400">
          Welcome back 👋
        </p>

        <h2 className="text-2xl font-bold sm:text-3xl">
          {user?.name || "Developer"}!
        </h2>

        <p className="mt-3 max-w-lg text-sm leading-6 text-gray-400 sm:text-base">
          Let's continue building your developer portfolio
          and showcase your work to the world.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={() => navigate("/dashboard/portfolios/create")}
            className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            + Create New Portfolio
          </button>

          <button
            onClick={() => navigate("/dashboard/portfolios")}
            className="flex items-center gap-2 rounded-lg border border-purple-500/60 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-500/10"
          >
            View My Portfolios
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;