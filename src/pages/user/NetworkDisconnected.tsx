import { WifiOff, RefreshCw, ShieldAlert } from "lucide-react";

export default function NetworkDisconnectedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-8">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="text-center">
          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-red-50
              text-red-500
              shadow-sm
            "
          >
            <WifiOff size={38} strokeWidth={1.8} />
          </div>

          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
            Network Connection Lost
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500 sm:text-base">
            This computer has temporarily lost connection to the JAMB Test
            server.
          </p>
        </div>

        {/* Main Card */}
        <div
          className="
            mt-8
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-sm
          "
        >
          {/* Status */}
          <div className="border-b border-red-100 bg-red-50 px-6 py-6 sm:px-8">
            <div className="flex gap-4">
              <div className="mt-0.5 shrink-0 text-red-500">
                <WifiOff size={23} />
              </div>

              <div>
                <h2 className="font-semibold text-red-900">
                  Connection interrupted
                </h2>

                <p className="mt-2 text-sm leading-6 text-red-800">
                  Communication with the central test server has been
                  interrupted. The system is automatically attempting to
                  reconnect.
                </p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="px-6 py-7 sm:px-8">
            <div className="space-y-4">
              {/* Reconnecting */}
              <div className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-slate-500
                    shadow-sm
                  "
                >
                  <RefreshCw size={20} className="animate-spin" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-700">
                    Reconnecting automatically
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    Please wait. The examination system is attempting to restore
                    communication with the central test server.
                  </p>
                </div>
              </div>

              {/* Important Notice */}
              <div className="flex gap-4 rounded-2xl border border-amber-100 bg-amber-50 p-4">
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white
                    text-amber-600
                    shadow-sm
                  "
                >
                  <ShieldAlert size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-amber-800">
                    Please do not close this window
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-amber-700">
                    Do not restart the computer or close the examination
                    application while the connection is being restored.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-500" />
              </span>

              <span className="text-xs font-semibold text-slate-500">
                Waiting for network connection...
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs font-medium text-slate-400">
            JAMB Test Network Monitor
          </p>

          <p className="mt-1 text-[11px] text-slate-400">
            Connection status is being monitored automatically.
          </p>
        </div>
      </div>
    </div>
  );
}
