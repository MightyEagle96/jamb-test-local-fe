import { useState } from "react";
import logo from "../../assets/logo.png";
import httpService from "../../services/http.service";
import { toastError } from "../../components/CustomToast";

export default function LoginPage() {
  const [referenceNumber, setReferenceNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!referenceNumber) {
      toastError("Please enter your reference number.");
      setLoading(false);
      return;
    }

    try {
      await httpService.post("/centres/login", {
        referenceNumber,
      });

      window.location.assign("/");
    } catch (error) {
      toastError(error);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-green-50 flex items-center justify-center p-6">
      <div className="relative w-full max-w-7xl overflow-hidden rounded-[36px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
        <div className="grid lg:grid-cols-2">
          {/* ================= LEFT PANEL ================= */}

          {/* ================= LEFT PANEL ================= */}

          <div
            className="
    relative
    overflow-hidden
    bg-gradient-to-br
    from-emerald-950
    via-green-800
    to-lime-600
    p-6
    md:p-8
    lg:p-10
    xl:p-14
    text-white
  "
          >
            {/* Decorative Grid */}

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

            {/* Ambient Lights */}

            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-lime-300/10 blur-3xl" />

            {/* Watermark */}

            <img
              src={logo}
              alt=""
              className="pointer-events-none absolute bottom-6 right-6 w-72 opacity-[0.05] select-none"
            />

            <div className="relative z-10 flex h-full flex-col justify-between">
              {/* ================= TOP ================= */}

              <div>
                {/* Logo */}

                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-xl lg:mb-8 lg:h-24 lg:w-24 xl:h-28 xl:w-28">
                  <img
                    src={logo}
                    alt="JAMB Logo"
                    className="w-14 lg:w-16 xl:w-20"
                  />
                </div>

                {/* Heading */}

                <h1 className="text-3xl font-black tracking-tight md:text-4xl xl:text-5xl">
                  JAMB TEST
                </h1>

                <h2 className="mt-2 text-xl font-light text-green-100 lg:text-2xl">
                  Version 2.0
                </h2>

                {/* Divider */}

                <div className="mt-5 h-1 w-20 rounded-full bg-white" />

                {/* Description */}

                <p className="mt-5 max-w-md text-base leading-7 text-green-50 lg:text-lg">
                  The official Centre and Network Simulation Tool of the Joint
                  Admissions and Matriculation Board.
                </p>

                {/* Enterprise Badge */}

                {/* <div className="mt-6 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-xl">
                  <span className="text-xs font-semibold tracking-[0.25em]">
                    ENTERPRISE EDITION
                  </span>
                </div> */}
              </div>

              {/* ================= BOTTOM ================= */}

              <div className="pt-8 lg:pt-12">
                {/* Status */}

                <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 backdrop-blur-xl">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300"></span>

                    <span className="relative inline-flex h-3 w-3 rounded-full bg-lime-300"></span>
                  </span>

                  <span className="text-sm font-medium tracking-wide">
                    Network Ready
                  </span>
                </div>

                {/* Features */}

                <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-green-100 lg:text-sm">
                  <span>Secure</span>

                  <span>•</span>

                  <span>Reliable</span>

                  <span>•</span>

                  <span>Nationwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          {/* ================= RIGHT PANEL ================= */}

          <div className="relative flex items-center justify-center overflow-hidden bg-white p-6 md:p-8 lg:p-10 xl:p-14">
            {/* White Curtain */}

            <div className="absolute inset-y-0 left-0 w-10 bg-white"></div>

            {/* Divider */}

            <div className="absolute inset-y-10 left-0 w-px bg-slate-200"></div>

            <div className="relative z-10 w-full max-w-md">
              {/* Heading */}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-green-700">
                  Welcome Back
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-800 md:text-4xl xl:text-5xl">
                  Centre Login
                </h2>

                <p className="mt-4 text-sm leading-7 text-slate-500 lg:text-base">
                  Login using your official centre reference number to access
                  the JAMB Test network simulation platform.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin}>
                <div className="mt-8 lg:mt-10">
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Centre Reference Number
                  </label>

                  <input
                    type="text"
                    value={referenceNumber}
                    onChange={(e) =>
                      setReferenceNumber(e.target.value.toUpperCase())
                    }
                    placeholder="UTME2017/37020002"
                    className="
                    w-full
                    rounded-2xl
                    border
                    border-slate-200
                    bg-slate-50
                    px-5
                    py-4
                    text-base
                    font-medium
                    outline-none
                    transition-all
                    duration-300
                    focus:border-green-600
                    focus:bg-white
                    focus:ring-4
                    focus:ring-green-100
                    lg:text-lg
                "
                  />
                </div>

                {/* Button */}

                <button
                  disabled={loading}
                  onClick={handleLogin}
                  className="
                mt-6
                flex
                w-full
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-r
                from-emerald-700
                via-green-600
                to-lime-600
                py-4
                text-base
                font-semibold
                text-white
                shadow-lg
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                active:scale-[0.98]
                lg:py-5
                lg:text-lg
            "
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Authenticating...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
              {/* Notice */}

              <p className="mt-6 text-center text-xs leading-6 text-slate-400 lg:text-sm">
                Only accredited CBT centres are authorized to access this
                application.
              </p>

              {/* Footer */}

              <div className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 text-xs text-slate-400 lg:mt-10 lg:pt-8 lg:text-sm">
                <span>Version 2.0.0</span>

                <span>© Joint Admissions & Matriculation Board</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
