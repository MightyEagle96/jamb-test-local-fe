import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

import {
  X,
  Monitor,
  Wifi,
  WifiOff,
  CheckCircle2,
  Clock3,
  Network,
} from "lucide-react";

interface NetworkTestResponse {
  _id: string;
  computer: string;
  networkTest: string;
  centre: string;
  createdAt: string;
  endedAt: string | null;
  ipAddress: string;
  loggedInAt: string;
  networkLosses: number;
  responses: number;
  status: string;
  timeLeft: number;
  updatedAt: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  responses: NetworkTestResponse[];
}

function NetworkTestResponsesModal({ open, onClose, responses }: Props) {
  const formatTime = (date?: string | null) => {
    if (!date) return "—";

    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const formatTimeLeft = (milliseconds: number) => {
    const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const getStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "ended":
        return {
          label: "Ended",
          icon: CheckCircle2,
          wrapper: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
          dot: "bg-emerald-500",
        };

      case "connected":
        return {
          label: "Connected",
          icon: Wifi,
          wrapper: "bg-blue-50 text-blue-700 ring-blue-600/20",
          dot: "bg-blue-500",
        };

      case "disconnected":
        return {
          label: "Disconnected",
          icon: WifiOff,
          wrapper: "bg-red-50 text-red-700 ring-red-600/20",
          dot: "bg-red-500",
        };

      default:
        return {
          label: status || "Unknown",
          icon: Network,
          wrapper: "bg-slate-50 text-slate-600 ring-slate-500/20",
          dot: "bg-slate-400",
        };
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xl"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: "20px",
            overflow: "hidden",
          },
        },
      }}
    >
      {/* Header */}

      <DialogTitle className="border-b border-slate-200 p-0">
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                bg-violet-50
                text-violet-700
              "
            >
              <Monitor size={21} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-800">
                Network Test Responses
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                {responses.length} system
                {responses.length !== 1 ? "s" : ""} participated in this network
                test.
              </p>
            </div>
          </div>

          <IconButton onClick={onClose}>
            <X size={20} />
          </IconButton>
        </div>
      </DialogTitle>

      <DialogContent className="p-0">
        <div className="max-h-[60vh] overflow-auto">
          <table className="w-full min-w-[1100px] text-left">
            <thead className="sticky top-0 z-10 bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  #
                </th>

                {/* <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Computer
                </th> */}

                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  IP Address
                </th>

                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Logged In
                </th>

                <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Responses
                </th>

                <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Losses
                </th>

                <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Time Left
                </th>

                <th className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Ended At
                </th>

                <th className="px-5 py-4 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {responses.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-5 py-20 text-center">
                    <Monitor size={38} className="mx-auto text-slate-300" />

                    <p className="mt-4 text-sm font-semibold text-slate-500">
                      No responses found
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      No computer responses were recorded for this network test.
                    </p>
                  </td>
                </tr>
              ) : (
                responses.map((response, index) => {
                  const status = getStatus(response.status);

                  const StatusIcon = status.icon;

                  return (
                    <tr
                      key={response._id}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Serial */}

                      <td className="px-5 py-4">
                        <span className="font-mono text-xs font-bold text-slate-400">
                          {index + 1}
                        </span>
                      </td>

                      {/* Computer */}

                      {/* <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-xl
                              bg-slate-100
                              text-slate-500
                            "
                          >
                            <Monitor size={16} />
                          </div>

                          <span className="font-mono text-xs text-slate-600">
                            {response.computer}
                          </span>
                        </div>
                      </td> */}

                      {/* IP Address */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Wifi size={14} className="text-slate-400" />

                          <span className="font-mono text-xs font-medium text-slate-600">
                            {response.ipAddress}
                          </span>
                        </div>
                      </td>

                      {/* Logged In */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Clock3 size={14} className="text-slate-400" />

                          <span className="text-xs text-slate-600">
                            {formatTime(response.loggedInAt)}
                          </span>
                        </div>
                      </td>

                      {/* Responses */}

                      <td className="px-5 py-4 text-center">
                        <span
                          className="
                            inline-flex
                            min-w-[45px]
                            items-center
                            justify-center
                            rounded-lg
                            bg-slate-100
                            px-2.5
                            py-1
                            text-xs
                            font-bold
                            text-slate-700
                          "
                        >
                          {response.responses}
                        </span>
                      </td>

                      {/* Network Losses */}

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`
                            inline-flex
                            min-w-[45px]
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

                      {/* Time Left */}

                      <td className="px-5 py-4 text-center">
                        <span className="font-mono text-xs font-bold tabular-nums text-slate-600">
                          {formatTimeLeft(response.timeLeft)}
                        </span>
                      </td>

                      {/* Ended At */}

                      <td className="px-5 py-4 text-center">
                        <span className="text-xs text-slate-600">
                          {formatTime(response.endedAt)}
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
                              px-3
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
      </DialogContent>
    </Dialog>
  );
}

export default NetworkTestResponsesModal;
