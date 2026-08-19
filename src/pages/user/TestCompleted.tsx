import { CheckCircle2, Clock3, Network, ShieldCheck } from "lucide-react";

interface NetworkTestConcludedPageProps {
  responses?: number;
  duration?: number;
}

function NetworkTestConcludedPage({
  responses,
  duration,
}: NetworkTestConcludedPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-emerald-100
              text-emerald-600
            "
          >
            <CheckCircle2 size={42} strokeWidth={1.8} />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Network Test Concluded
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            The network connectivity test has successfully reached the end of
            its allotted duration.
          </p>
        </div>

        {/* Main Card */}
        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          {/* Success Banner */}
          <div className="border-b border-emerald-100 bg-emerald-50 px-6 py-6 sm:px-8">
            <div className="flex gap-4">
              <div className="mt-0.5 shrink-0 text-emerald-600">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h2 className="font-semibold text-emerald-900">
                  Test completed successfully
                </h2>

                <p className="mt-2 text-sm leading-6 text-emerald-800">
                  This computer has completed the network test. The responses
                  recorded during the test have been submitted to the central
                  JAMB Test system.
                </p>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="px-6 py-7 sm:px-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Test Summary
            </h3>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {/* Duration */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-slate-500
                      shadow-sm
                    "
                  >
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Test Duration
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {duration ? `${duration} minutes` : "Completed"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Responses */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-white
                      text-slate-500
                      shadow-sm
                    "
                  >
                    <Network size={19} />
                  </div>

                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                      Responses Recorded
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {responses ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-6 sm:px-8">
            <p className="text-center text-sm leading-6 text-slate-500">
              Please wait for further instructions from the centre
              administrator. You may now close this window.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
          <CheckCircle2 size={13} />

          <span>JAMB Test Network Verification</span>
        </div>
      </div>
    </div>
  );
}

export default NetworkTestConcludedPage;
