import { LoaderCircle, Network, Server } from "lucide-react";

function NetworkTestLoadingPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md px-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          {/* Icon */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Network size={30} />
          </div>

          {/* Title */}

          <div className="mt-6 text-center">
            <h1 className="text-lg font-bold text-slate-800">
              Preparing Network Test
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Retrieving your workstation information and preparing your network
              assessment environment.
            </p>
          </div>

          {/* Loading animation */}

          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 rounded-xl bg-slate-50 px-5 py-3">
              <LoaderCircle
                size={20}
                className="animate-spin text-emerald-600"
              />

              <span className="text-xs font-semibold text-slate-600">
                Initializing test environment...
              </span>
            </div>
          </div>

          {/* Steps */}

          <div className="mt-8 space-y-3">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50">
                <Server size={14} className="text-emerald-600" />
              </div>

              <span className="text-xs text-slate-500">
                Connecting to local test server
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-50">
                <Network size={14} className="text-slate-400" />
              </div>

              <span className="text-xs text-slate-500">
                Loading network test configuration
              </span>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-[10px] text-slate-400">
          JAMB Test Network Assessment System
        </p>
      </div>
    </div>
  );
}

export default NetworkTestLoadingPage;
