import {
  CheckCircle2,
  Clock3,
  Monitor,
  Wifi,
  WifiOff,
  Search,
  X,
} from "lucide-react";
import { useState } from "react";

interface NetworkTestResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
  networkTest: string;
  computer: string;
  loggedInAt: string;
  ipAddress: string;
  responses: number;
  timeLeft: number;
  status: string;
  networkLosses: number;
}

interface Props {
  responses: NetworkTestResponse[];
}

function NetworkTestResponsesTable({ responses }: Props) {
  const [ipSearch, setIpSearch] = useState("");

  const filteredResponses = responses.filter((response) =>
    response.ipAddress?.toLowerCase().includes(ipSearch.trim().toLowerCase()),
  );
  const formatTimeLeft = (milliseconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "connected":
        return {
          label: "Connected",
          wrapper: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
          dot: "bg-emerald-500",
          icon: CheckCircle2,
        };

      case "disconnected":
        return {
          label: "Disconnected",
          wrapper: "bg-red-50 text-red-700 ring-red-600/20",
          dot: "bg-red-500",
          icon: WifiOff,
        };

      default:
        return {
          label: status || "Unknown",
          wrapper: "bg-slate-50 text-slate-600 ring-slate-500/20",
          dot: "bg-slate-400",
          icon: Wifi,
        };
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-sm font-bold text-slate-800">
            Connected Systems
          </h2>

          <p className="mt-1 text-xs text-slate-400">
            Live participation in this network test
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* IP Search */}
          <div className="relative">
            <Search
              size={15}
              className="
          pointer-events-none
          absolute
          left-3
          top-1/2
          -translate-y-1/2
          text-slate-400
        "
            />

            <input
              type="text"
              value={ipSearch}
              onChange={(e) => setIpSearch(e.target.value)}
              placeholder="Search IP address..."
              className="
          h-9
          w-full
          rounded-xl
          border
          border-slate-200
          bg-white
          pl-9
          pr-9
          text-xs
          font-medium
          text-slate-700
          outline-none
          transition
          placeholder:text-slate-400
          focus:border-emerald-400
          focus:ring-2
          focus:ring-emerald-500/10
          sm:w-56
        "
            />

            {ipSearch && (
              <button
                type="button"
                onClick={() => setIpSearch("")}
                className="
            absolute
            right-2.5
            top-1/2
            -translate-y-1/2
            rounded-md
            p-1
            text-slate-400
            transition
            hover:bg-slate-100
            hover:text-slate-600
          "
                aria-label="Clear IP search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* System Count */}
          <div className="flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>

            {ipSearch
              ? `${filteredResponses.length} of ${responses.length} Systems`
              : `${responses.length} Systems`}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="max-h-[50vh] overflow-auto">
        <table className="w-full min-w-[850px] text-left">
          <thead className="sticky top-0 z-10">
            <tr className="border-b border-slate-100 bg-slate-50/70">
              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                System
              </th>

              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                IP Address
              </th>

              <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Logged In
              </th>

              <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Responses
              </th>

              <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Losses
              </th>

              <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Time Left
              </th>

              <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {filteredResponses.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center">
                  {ipSearch ? (
                    <>
                      <Search size={32} className="mx-auto text-slate-300" />

                      <p className="mt-3 text-sm font-medium text-slate-500">
                        No matching systems found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        No system matches IP address "{ipSearch}".
                      </p>

                      <button
                        type="button"
                        onClick={() => setIpSearch("")}
                        className="
              mt-4
              text-xs
              font-semibold
              text-emerald-600
              hover:text-emerald-700
            "
                      >
                        Clear search
                      </button>
                    </>
                  ) : (
                    <>
                      <Monitor size={32} className="mx-auto text-slate-300" />

                      <p className="mt-3 text-sm font-medium text-slate-500">
                        No systems connected yet
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Connected systems will appear here automatically.
                      </p>
                    </>
                  )}
                </td>
              </tr>
            ) : (
              filteredResponses.map((response, index) => {
                const status = getStatus(response.status);

                const StatusIcon = status.icon;

                return (
                  <tr
                    key={response._id}
                    className="group transition hover:bg-slate-50/70"
                  >
                    {/* System */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                          <Monitor size={17} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-700">
                            System {index + 1}
                          </p>

                          <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                            {response.computer}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* IP */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Wifi size={14} className="text-slate-400" />

                        <span className="font-mono text-xs font-medium text-slate-600">
                          {response.ipAddress}
                        </span>
                      </div>
                    </td>

                    {/* Login */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Clock3 size={14} className="text-slate-400" />

                        <span className="text-xs font-medium text-slate-600">
                          {formatDate(response.loggedInAt)}
                        </span>
                      </div>
                    </td>

                    {/* Responses */}
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex min-w-[40px] items-center justify-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                        {response.responses}
                      </span>
                    </td>

                    {/* Losses */}
                    <td className="px-5 py-4 text-center">
                      <span
                        className={`
                          inline-flex
                          min-w-[40px]
                          items-center
                          justify-center
                          rounded-lg
                          px-2.5
                          py-1
                          text-xs
                          font-bold
                          ${
                            response.networkLosses > 0
                              ? "bg-red-50 text-red-600"
                              : "bg-emerald-50 text-emerald-600"
                          }
                        `}
                      >
                        {response.networkLosses}
                      </span>
                    </td>

                    {/* Time */}
                    <td className="px-5 py-4 text-center">
                      <span className="font-mono text-xs font-bold tabular-nums text-slate-700">
                        {formatTimeLeft(response.timeLeft)}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end">
                        <span
                          className={`
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            px-2.5
                            py-1
                            text-[11px]
                            font-semibold
                            ring-1
                            ring-inset
                            ${status.wrapper}
                          `}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${status.dot}`}
                          />

                          <StatusIcon size={12} />

                          {status.label}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NetworkTestResponsesTable;
