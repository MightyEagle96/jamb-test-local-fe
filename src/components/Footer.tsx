function Footer() {
  return (
    <div className="border-t border-slate-200 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <footer className="py-8 px-8">
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          {/* Left */}
          <div>
            <h3 className="text-sm font-bold tracking-[0.25em] text-emerald-700">
              JAMB TEST 2.0
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Enterprise Centre & Network Simulation Platform
            </p>
          </div>

          {/* Centre */}
          {/* <div className="flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500"></span>

              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>

            <span className="text-sm font-semibold text-emerald-700">
              Enterprise Edition
            </span>
          </div> */}

          {/* Right */}
          <div className="text-sm text-slate-500">
            <p>Version 2.0.0</p>

            <p className="mt-1">
              © {new Date().getFullYear()} Joint Admissions & Matriculation
              Board
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
