import Logo from "../common/Logo";

const AuthLayout = ({
  title,
  subtitle,
  eyebrow = "Start building",
  panelEyebrow = "Your work, in context",
  panelTitle = "Make the proof of your work easy to trust.",
  panelBody = "One focused place for the projects, decisions, and experience that make you the developer you are.",
  panelFoot = "01  Collect the signal. Publish the story.",
  children,
}) => {
  return (
    <div className="auth-grid min-h-screen px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-6xl flex-col">
        <header className="mb-8">
          <Logo to="/login" />
        </header>

        <div className="flex flex-1 items-center justify-center pb-8">
          <div className="grid w-full overflow-hidden rounded-[28px] border border-stone-200/80 bg-white shadow-[0_30px_80px_rgba(27,35,48,0.12)] lg:grid-cols-[1.05fr_1fr]">
            <aside className="relative hidden min-h-[560px] flex-col justify-between overflow-hidden bg-navy px-10 py-12 text-white lg:flex">
              <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-20 right-10 h-64 w-64 rounded-full border border-white/10" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
                {panelEyebrow}
              </p>

              <div className="relative max-w-md">
                <h1 className="font-display text-[2.6rem] leading-[1.15] font-medium tracking-tight">
                  {panelTitle}
                </h1>
                <p className="mt-5 max-w-sm text-sm leading-7 text-white/65">
                  {panelBody}
                </p>
              </div>

              <p className="relative text-xs tracking-wide text-white/40">
                {panelFoot}
              </p>
            </aside>

            <div className="flex flex-col justify-center bg-white px-6 py-10 sm:px-10 lg:px-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
              <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-ink sm:text-[2.1rem]">
                {title}
              </h2>
              {subtitle && (
                <p className="mt-2 text-sm text-muted">{subtitle}</p>
              )}
              <div className="mt-8">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
