export interface NetworkTestUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: () => void;

  computersParticipated: number;
  centreCapacity: number;

  responseThroughput: string;

  duration: number;

  computersWithNetworkLosses: number;
  totalNetworkLosses: number;

  uploading?: boolean;
}

import {
  CheckCircle2,
  XCircle,
  Upload,
  Users,
  Activity,
  Clock3,
  WifiOff,
  AlertTriangle,
} from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@mui/material";

export interface NetworkTestUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onUpload: () => void;

  computersParticipated: number;
  centreCapacity: number;

  responseThroughput: string;

  duration: number;

  computersWithNetworkLosses: number;
  totalNetworkLosses: number;

  uploading?: boolean;
}

interface CriterionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: string;
  passed: boolean;
}

function Criterion({
  icon,
  title,
  description,
  value,
  passed,
}: CriterionProps) {
  return (
    <div
      className={`
        flex
        items-center
        justify-between
        gap-4
        rounded-2xl
        border
        p-4
        transition
        ${
          passed
            ? "border-emerald-200 bg-emerald-50/70"
            : "border-red-200 bg-red-50/60"
        }
      `}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={`
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            ${
              passed
                ? "bg-emerald-100 text-emerald-700"
                : "bg-red-100 text-red-600"
            }
          `}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-800">{title}</p>

          <p className="mt-0.5 text-xs leading-5 text-slate-500">
            {description}
          </p>

          <p
            className={`
              mt-1
              text-xs
              font-bold
              ${passed ? "text-emerald-700" : "text-red-600"}
            `}
          >
            {value}
          </p>
        </div>
      </div>

      <div className="shrink-0">
        {passed ? (
          <CheckCircle2 size={24} className="text-emerald-600" />
        ) : (
          <XCircle size={24} className="text-red-500" />
        )}
      </div>
    </div>
  );
}

export default function NetworkTestUploadDialog({
  open,
  onClose,
  onUpload,
  computersParticipated,
  centreCapacity,
  responseThroughput,
  duration,
  computersWithNetworkLosses,
  totalNetworkLosses,
  uploading = false,
}: NetworkTestUploadDialogProps) {
  /*
   * Response throughput may arrive from the API as:
   *
   * "96.42%"
   *
   * Convert it to a number for comparison.
   */
  const throughput = parseFloat(responseThroughput) || 0;

  /*
   * Upload criteria
   */
  const participationPassed = computersParticipated >= centreCapacity;

  const throughputPassed = throughput > 95;

  const durationPassed = duration >= 60;

  const computersWithLossesPassed = computersWithNetworkLosses <= 5;

  const totalLossesPassed = totalNetworkLosses <= 45;

  /*
   * Every criterion must pass.
   */
  const canUpload =
    participationPassed &&
    throughputPassed &&
    durationPassed &&
    computersWithLossesPassed &&
    totalLossesPassed;

  return (
    <Dialog
      open={open}
      onClose={uploading ? undefined : onClose}
      maxWidth="md"
      fullWidth
    >
      {/* Header */}
      <DialogTitle className="border-b border-slate-100 bg-slate-50 !px-6 !py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Upload size={21} />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Upload Network Test Results
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              The test must satisfy all upload requirements.
            </p>
          </div>
        </div>
      </DialogTitle>

      <DialogContent className="!p-6">
        {/* Summary */}
        <div className="mb-5 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                ${
                  canUpload
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }
              `}
            >
              {canUpload ? (
                <CheckCircle2 size={20} />
              ) : (
                <AlertTriangle size={20} />
              )}
            </div>

            <div>
              <p className="text-sm font-bold text-slate-800">
                {canUpload
                  ? "All upload requirements have been met."
                  : "Upload requirements have not been met."}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {canUpload
                  ? "This network test is eligible for upload."
                  : "All five criteria must pass before the result can be uploaded."}
              </p>
            </div>
          </div>
        </div>

        {/* Criteria */}
        <div className="space-y-3">
          <Criterion
            icon={<Users size={19} />}
            title="Participating Computers"
            description={`At least ${centreCapacity.toLocaleString()} computers must participate.`}
            value={`${computersParticipated.toLocaleString()} / ${centreCapacity.toLocaleString()} computers`}
            passed={participationPassed}
          />

          <Criterion
            icon={<Activity size={19} />}
            title="Response Throughput"
            description="Response throughput must be greater than 95%."
            value={`${throughput.toFixed(2)}%`}
            passed={throughputPassed}
          />

          <Criterion
            icon={<Clock3 size={19} />}
            title="Test Duration"
            description="The network test must run for at least 60 minutes."
            value={`${duration} minutes`}
            passed={durationPassed}
          />

          <Criterion
            icon={<WifiOff size={19} />}
            title="Computers With Network Losses"
            description="No more than 5 computers may experience network losses."
            value={`${computersWithNetworkLosses} computers`}
            passed={computersWithLossesPassed}
          />

          <Criterion
            icon={<AlertTriangle size={19} />}
            title="Total Network Losses"
            description="Total network losses must not exceed 45."
            value={`${totalNetworkLosses} losses`}
            passed={totalLossesPassed}
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={uploading}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-3
              text-sm
              font-semibold
              text-slate-600
              transition
              hover:bg-slate-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            Close
          </button>

          <button
            type="button"
            onClick={onUpload}
            disabled={!canUpload || uploading}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-emerald-700
              via-green-600
              to-lime-600
              px-6
              py-3
              text-sm
              font-bold
              text-white
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:shadow-md
              disabled:cursor-not-allowed
              disabled:from-slate-300
              disabled:via-slate-300
              disabled:to-slate-300
              disabled:text-slate-500
              disabled:shadow-none
            "
          >
            <Upload size={17} />

            {uploading ? "Uploading..." : "Upload Results"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
