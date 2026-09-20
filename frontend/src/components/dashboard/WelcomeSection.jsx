import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const WelcomeSection = ({ user }) => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden rounded-[28px] border border-stone-200 bg-navy px-6 py-8 text-white sm:px-10 sm:py-12">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full border border-white/10" />
      <div className="pointer-events-none absolute -bottom-24 right-20 h-64 w-64 rounded-full border border-white/10" />

      <div className="relative max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
          Welcome back
        </p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          {user?.name || "Developer"}
        </h2>
        <p className="mt-3 max-w-lg text-sm leading-7 text-white/65">
          Continue shaping a portfolio that is easy to trust — projects,
          experience, and the story behind your work.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            onClick={() => navigate("/dashboard/portfolios/create")}
            className="bg-accent text-white hover:bg-emerald-600"
          >
            Create new portfolio
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate("/dashboard/portfolios")}
            className="border-white/15 bg-white/5 text-white hover:bg-white/10"
          >
            View my portfolios
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
