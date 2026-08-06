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

        <div className="bg-gradient-to-r from-red-600 to-rose-600 px-8 py-10 text-white">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
              <AlertTriangle size={42} />
            </div>

            <div>
              <h2 className="text-3xl font-black">
                SYSTEM SERVICE UNAVAILABLE
              </h2>

              <p className="mt-3 text-red-100">
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
                Local Agent is not running
              </li>

              <li className="flex items-center gap-3">
                <span className="text-green-600">✓</span>
                Port 45454 is unavailable
              </li>

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

            <button
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
