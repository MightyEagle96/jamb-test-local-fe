import { AlertTriangle, RotateCw, Power } from "lucide-react";

interface Props {
  onRetry: () => void;
}

export default function FailurePanel({ onRetry }: Props) {
  return (
    <div className="w-full max-w-2xl">
      {/* Card */}

      <div className="rounded-[32px] border border-red-200 bg-white shadow-lg overflow-hidden">
        {/* Header */}

        <div className="bg-gradient-to-r from-red-600 to-rose-600 px-6 py-6 md:px-8 md:py-8 text-white">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur lg:h-16 lg:w-16">
              <AlertTriangle className="h-7 w-7 lg:h-8 lg:w-8" />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl font-black leading-tight md:text-2xl xl:text-3xl">
                System Service Unavailable
              </h2>

              <p className="mt-2 text-sm leading-6 text-red-100 md:text-base">
                Unable to communicate with the local JAMB Test Agent.
              </p>
            </div>
          </div>
        </div>

        {/* Body */}

        <div className="p-8">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-slate-800">Possible Causes</h3>

            <ul className="mt-5 space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                Jamb Test Agent is not running
              </li>

              {/* <li className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                Port 45454 is unavailable
              </li> */}

              <li className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                Windows Firewall blocked communication
              </li>

              <li className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                Antivirus software prevented access
              </li>
            </ul>
          </div>

          {/* Buttons */}

          <div className="mt-8 flex gap-4">
            <button
              onClick={onRetry}
              className="
                            flex-1
                            rounded-2xl
                            bg-gradient-to-r
                            from-emerald-700
                            to-green-600
                            py-4
                            font-semibold
                            text-white
                            transition
                            hover:scale-[1.02]
                        "
            >
              <span className="flex items-center justify-center gap-3">
                <RotateCw size={20} />
                Retry Inspection
              </span>
            </button>

            {/* <button
              className="
                            rounded-2xl
                            border
                            border-slate-300
                            px-8
                            font-semibold
                            transition
                            hover:bg-slate-100
                        "
            >
              <span className="flex items-center gap-3">
                <Power size={20} />
                Exit
              </span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
