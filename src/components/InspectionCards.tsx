import {
  ArrowRight,
  CheckCircle2,
  CloudUpload,
  Cpu,
  HardDrive,
  Monitor,
  Network,
  ShieldCheck,
} from "lucide-react";

//import SystemCard from "./SystemCard";
import type { SystemInformation } from "../types/system";
import type { Status } from "../pages/user/SystemInspectionPage";

interface Props {
  system: SystemInformation["data"];
  onRegister?: () => void;
  registrationStatus: Status;
}

export default function InspectionCards({
  system,
  onRegister,
  registrationStatus,
}: Props) {
  return (
    <div className="w-full">
      {/* Header */}

      <div className="mb-6 lg:mb-8">
        <h2 className="text-2xl font-black text-slate-800 md:text-3xl xl:text-4xl">
          System Readiness Inspection
        </h2>

        <p className="mt-2 text-sm leading-6 text-slate-500 lg:text-base">
          This computer has successfully completed the readiness inspection and
          satisfies the minimum requirements for JAMB Test 2.0.
        </p>
      </div>

      {/* Cards */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Header information */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Monitor size={18} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-800">
                System Information
              </h2>

              <p className="text-xs text-slate-500">
                Computer details detected by the JAMB Test Agent
              </p>
            </div>
          </div>

          {/* Register action */}
          {/* <button
            type="button"
            onClick={onRegister}
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
      px-5
      py-2.5
      text-sm
      font-bold
      text-white
      shadow-sm
      transition-all
      duration-200
      hover:-translate-y-0.5
      hover:shadow-md
      active:scale-[0.98]
    "
          >
            Register Computer
            <ArrowRight size={16} />
          </button> */}

          {/* Register / Status action */}

          {registrationStatus === "not registered" && (
            <button
              type="button"
              onClick={onRegister}
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
      px-5
      py-2.5
      text-sm
      font-bold
      text-white
      shadow-sm
      transition-all
      duration-200
      hover:-translate-y-0.5
      hover:shadow-md
      active:scale-[0.98]
    "
            >
              Register Computer
              <ArrowRight size={16} />
            </button>
          )}

          {registrationStatus === "awaiting upload" && (
            <div
              className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      bg-amber-50
      px-5
      py-2.5
      text-sm
      font-semibold
      text-amber-700
      ring-1
      ring-inset
      ring-amber-600/20
    "
            >
              <CloudUpload size={16} />
              Awaiting Upload
            </div>
          )}

          {registrationStatus === "registered" && (
            <div
              className="
      inline-flex
      items-center
      gap-2
      rounded-xl
      bg-emerald-50
      px-5
      py-2.5
      text-sm
      font-semibold
      text-emerald-700
      ring-1
      ring-inset
      ring-emerald-600/20
    "
            >
              <CheckCircle2 size={16} />
              Registered
            </div>
          )}
        </div>

        <div className="divide-y divide-slate-100">
          {/* Operating System */}
          <SystemSection title="Operating System" icon={<Monitor size={17} />}>
            <SystemRow label="Name" value={system.operatingSystem.name} />

            <SystemRow label="Version" value={system.operatingSystem.version} />

            <SystemRow
              label="Build"
              value={system.operatingSystem.buildNumber}
            />

            <SystemRow
              label="Architecture"
              value={system.operatingSystem.architecture}
            />

            <SystemRow
              label="Hostname"
              value={system.operatingSystem.hostname}
            />
          </SystemSection>

          {/* Processor */}
          <SystemSection title="Processor" icon={<Cpu size={17} />}>
            <SystemRow
              label="Manufacturer"
              value={system.processor.manufacturer}
            />

            <SystemRow label="Model" value={system.processor.model} />

            <SystemRow label="Cores" value={`${system.processor.cores}`} />

            <SystemRow
              label="Clock Speed"
              value={`${system.processor.clockSpeedGHz} GHz`}
            />
          </SystemSection>

          {/* Memory */}
          <SystemSection title="Memory" icon={<HardDrive size={17} />}>
            <SystemRow
              label="Total Memory"
              value={`${Math.ceil(system.memory.totalBytes / 1024 ** 3).toFixed(2)} GB`}
            />

            <SystemRow
              label="Usable Memory"
              value={`${(system.memory.totalBytes / 1024 ** 3).toFixed(2)} GB`}
            />
          </SystemSection>

          {/* Network */}
          <SystemSection title="Network" icon={<Network size={17} />}>
            <SystemRow label="Hostname" value={system.network.hostname} />

            <SystemRow
              label="MAC Address"
              value={system.network.macAddress}
              mono
            />
          </SystemSection>

          {/* Identity */}
          <SystemSection
            title="Machine Identity"
            icon={<ShieldCheck size={17} />}
          >
            <SystemRow
              label="Serial Number"
              value={system.identity.serialNumber}
              mono
            />
          </SystemSection>
        </div>

        {/* Action */}
        {/* <div className="border-t border-slate-100 bg-slate-50 p-4">
          <button
            onClick={onRegister}
            className="
        w-full
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
        duration-200
        hover:-translate-y-0.5
        hover:shadow-md
        active:scale-[0.98]
      "
          >
            Register Computer →
          </button>
        </div> */}
      </div>
    </div>
  );
}

function SystemRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex min-h-9 items-center justify-between gap-6 py-1.5">
      <span className="shrink-0 text-xs font-medium text-slate-400">
        {label}
      </span>

      <span
        className={`
          min-w-0
          break-all
          text-right
          text-xs
          font-semibold
          text-slate-700
          ${mono ? "font-mono" : ""}
        `}
      >
        {value || "—"}
      </span>
    </div>
  );
}
function SystemSection({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="px-5 py-3">
      <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
        {icon}
        {title}
      </div>

      <div className="divide-y divide-slate-50">{children}</div>
    </div>
  );
}
