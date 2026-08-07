import logo from "../assets/logo.png";

export default function LoadingPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-green-800 to-lime-600">
      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)
          `,
          backgroundSize: "38px 38px",
        }}
      />

      {/* Glow */}

      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-lime-300/10 blur-3xl" />

      {/* Card */}

      <div className="relative z-10 w-full max-w-lg rounded-[36px] border border-white/15 bg-white/10 p-10 text-center shadow-2xl backdrop-blur-3xl">
        {/* Logo */}

        <div className="mx-auto flex h-28 w-28 animate-pulse items-center justify-center rounded-[32px] border border-white/20 bg-white/10">
          <img src={logo} alt="JAMB" className="w-20" />
        </div>

        <h1 className="mt-8 text-4xl font-black text-white">JAMB TEST 2.0</h1>

        <p className="mt-3 text-lg text-green-100">
          Enterprise Examination Platform
        </p>

        {/* Loading */}

        <div className="mt-12">
          <p className="mb-5 font-medium tracking-wide text-green-100">
            Initializing System...
          </p>

          <div className="h-3 overflow-hidden rounded-full bg-white/15">
            <div className="h-full w-1/2 animate-[loading_2s_ease-in-out_infinite] rounded-full bg-white" />
          </div>
        </div>

        {/* Footer */}

        <div className="mt-10 flex items-center justify-center gap-3 text-sm text-green-100">
          <span>Secure</span>

          <span>•</span>

          <span>Reliable</span>

          <span>•</span>

          <span>Nationwide</span>
        </div>
      </div>
    </div>
  );
}
