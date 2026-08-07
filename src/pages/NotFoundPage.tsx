import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import { Link } from "react-router-dom";

import logo from "../assets/logo.png";

export default function NotFoundPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-950 via-green-900 to-lime-700 px-6">
      {/* Decorative Background */}

      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-lime-300/10 blur-3xl" />

      {/* Watermark */}

      <img
        src={logo}
        alt="JAMB"
        className="pointer-events-none absolute bottom-[-100px] right-[-100px] w-[420px] opacity-10"
      />

      {/* Card */}

      <div className="relative z-10 w-full max-w-2xl rounded-[32px] border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-3xl md:p-14">
        {/* Header */}

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10">
          <ShieldAlert size={52} className="text-yellow-300" />
        </div>

        <h1 className="mt-8 text-center text-6xl font-black tracking-tight text-white">
          404
        </h1>

        <h2 className="mt-3 text-center text-3xl font-bold text-white">
          Page Not Found
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-center text-lg leading-8 text-green-100">
          The page you are trying to access does not exist or may have been
          moved. Please return to the dashboard to continue using the JAMB Test
          Test Platform.
        </p>

        {/* Divider */}

        <div className="mx-auto mt-10 h-1 w-24 rounded-full bg-white/70" />

        {/* Buttons */}

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-white
              px-8
              py-4
              font-semibold
              text-green-800
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-2xl
            "
          >
            <Home size={20} />
            Return Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              flex
              items-center
              justify-center
              gap-3
              rounded-2xl
              border
              border-white/30
              bg-white/10
              px-8
              py-4
              font-semibold
              text-white
              backdrop-blur
              transition-all
              duration-300
              hover:bg-white/20
            "
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
