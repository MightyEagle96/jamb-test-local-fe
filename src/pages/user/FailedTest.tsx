import { AlertTriangle, Database, ShieldAlert, WifiOff } from "lucide-react";

function NetworkTestBlocked() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-amber-100
              text-amber-600
            "
          >
            <AlertTriangle size={40} strokeWidth={1.8} />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Network Test Activated
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            A network test has been activated for this centre, but this computer
            cannot participate in the test.
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
          {/* Alert */}
          <div className="border-b border-amber-100 bg-amber-50 px-6 py-6 sm:px-8">
            <div className="flex gap-4">
              <div className="mt-0.5 shrink-0 text-amber-600">
                <WifiOff size={24} />
              </div>

              <div>
                <h2 className="font-semibold text-amber-900">
                  This system is not eligible to participate
                </h2>

                <p className="mt-2 text-sm leading-6 text-amber-800">
                  The system could not be verified against the central JAMB Test
                  database. As a result, it has been excluded from the current
                  network test.
                </p>
              </div>
            </div>
          </div>

          {/* Possible Reasons */}
          <div className="px-6 py-7 sm:px-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Possible reasons
            </h3>

            <div className="mt-5 space-y-4">
              {/* Not registered */}
              <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    text-slate-600
                  "
                >
                  <Database size={21} />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700">
                    System not registered
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    This computer has not been registered on the central JAMB
                    Test database and therefore cannot participate in the
                    network test.
                  </p>
                </div>
              </div>

              {/* Infraction */}
              <div className="flex gap-4 rounded-2xl border border-slate-200 p-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-red-50
                    text-red-600
                  "
                >
                  <ShieldAlert size={21} />
                </div>

                <div>
                  <h4 className="font-semibold text-slate-700">
                    System flagged for an infraction
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    This computer may have been flagged for an infraction and
                    has consequently been prevented from participating in the
                    network test.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Instruction */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-6 sm:px-8">
            <p className="text-center text-sm leading-6 text-slate-500">
              Please contact the centre administrator or JAMB technical support
              for assistance. Do not attempt to modify or bypass the system
              registration.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-400">
          JAMB Test Network Verification
        </p>
      </div>
    </div>
  );
}

export default NetworkTestBlocked;
