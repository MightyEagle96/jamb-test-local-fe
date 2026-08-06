import { Cpu, HardDrive, Monitor, Network, ShieldCheck } from "lucide-react";

import SystemCard from "./SystemCard";
import type { SystemInformation } from "../types/system";

interface Props {
  system: SystemInformation["data"];
  onRegister?: () => void;
}

export default function InspectionCards({ system, onRegister }: Props) {
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

      <div className="grid gap-4 lg:grid-cols-2 lg:gap-6">
        {/* Operating System */}

        <SystemCard icon={<Monitor size={22} />} title="Operating System">
          <p className="break-words font-semibold leading-6 text-slate-800">
            {system.operatingSystem.name}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Version {system.operatingSystem.version} •{" "}
            {system.operatingSystem.architecture}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {system.operatingSystem.hostname}
          </p>
        </SystemCard>

        {/* Processor */}

        <SystemCard icon={<Cpu size={22} />} title="Processor">
          <p className="break-words font-semibold leading-6 text-slate-800">
            {system.processor.model}
          </p>

          <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
            <span>{system.processor.cores} Cores</span>

            <span>{system.processor.clockSpeedGHz} GHz</span>
          </div>
        </SystemCard>

        {/* Memory */}

        <SystemCard icon={<HardDrive size={22} />} title="Memory">
          <p className="text-2xl font-black text-emerald-700 lg:text-3xl">
            {system.memory.totalGB} GB
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Installed Physical Memory
          </p>
        </SystemCard>

        {/* Network */}

        <SystemCard icon={<Network size={22} />} title="Network">
          <p className="break-all font-semibold text-slate-800">
            {system.network.hostname}
          </p>

          <p className="mt-2 break-all text-sm text-slate-500">
            {system.network.macAddress}
          </p>
        </SystemCard>

        {/* Machine Identity */}

        <SystemCard icon={<ShieldCheck size={22} />} title="Machine Identity">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Machine Serial Number
          </p>

          <p className="mt-2 break-all font-mono text-lg font-bold text-emerald-700 md:text-xl">
            {system.identity.serialNumber}
          </p>
        </SystemCard>

        <div
          className="
        rounded-2xl
        border
        border-emerald-200
        bg-gradient-to-br
        from-emerald-50
        to-green-50
        p-6
        flex
        items-center
        justify-center
    "
        >
          <button
            onClick={onRegister}
            className="
            w-full
            rounded-2xl
            bg-gradient-to-r
            from-emerald-700
            via-green-600
            to-lime-600
            px-8
            py-4
            font-semibold
            text-white
            shadow-lg
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-xl
            active:scale-[0.98]
        "
          >
            Register Computer →
          </button>
        </div>
      </div>
    </div>
  );
}
