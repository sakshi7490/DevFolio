import heroImage from "../../assets/hero.png";
import logo from "../../assets/devfolio-logo.png";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-10 lg:grid-cols-2 lg:px-12">

      {/* ================= LEFT SECTION ================= */}
      <div className="flex flex-col items-center justify-center text-center lg:items-start lg:text-left">

        <img
          src={heroImage}
          alt="Developer Illustration"
          className="w-full max-w-[600px] rounded-xl object-cover"
          draggable={false}
        />

        <h1 className="mt-6 text-5xl font-extrabold tracking-tight text-white lg:text-6xl">
          DEVFOLIO
        </h1>

        <p className="mt-3 max-w-[620px] text-base leading-7 text-gray-400 lg:text-lg">
          Build your professional developer portfolio, showcase your skills,
          projects, and achievements to impress recruiters worldwide.
        </p>

      </div>

      {/* ================= RIGHT SECTION ================= */}
      <div className="flex items-center justify-center">

        <div
          className="
            w-full max-w-[480px]
            rounded-2xl
            border border-purple-500/30
            bg-[#15161d]
            px-7 py-8
            shadow-[0_0_50px_rgba(124,58,237,0.12)]
            sm:px-9 sm:py-10
          "
        >

          {/* Logo */}
          <div className="mb-7 flex justify-center">
            <div
              className="
                flex h-24 w-24
                items-center justify-center
                rounded-2xl
                border border-cyan-400/20
                bg-[#11121a]
                shadow-[0_0_25px_rgba(34,211,238,0.08)]
              "
            >
              <img
                src={logo}
                alt="DevFolio Logo"
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-7 text-center">
            <h2 className="!m-0 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {title}
            </h2>

            <p className="mt-2 !text-base leading-6 text-gray-400">
              {subtitle}
            </p>
          </div>

          {/* Form */}
          {children}

        </div>
      </div>

    </div>
  );
};

export default AuthLayout;