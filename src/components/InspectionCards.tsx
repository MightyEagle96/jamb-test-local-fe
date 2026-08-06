import { Cpu, HardDrive, Monitor, Network, ShieldCheck } from "lucide-react";

import SystemCard from "./SystemCard";
import type { SystemInformation } from "../types/system";

interface Props {
  system: SystemInformation["data"];
}

export default function InspectionCards({ system }: Props) {
  return (
    <div className="w-full">
      {/* Header */}

      <div className="mb-10">
        <h2 className="text-4xl font-black text-slate-800">
          System Inspection
        </h2>

        <p className="mt-3 text-slate-500">
          This computer has successfully completed the readiness inspection.
        </p>
      </div>

      {/* Grid */}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Operating System */}

        <SystemCard icon={<Monitor size={24} />} title="Operating System">
          <p className="font-semibold text-slate-800">
            {system.operatingSystem.name}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Version {system.operatingSystem.version}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {system.operatingSystem.architecture}
          </p>
        </SystemCard>

        {/* Processor */}

        <SystemCard icon={<Cpu size={24} />} title="Processor">
          <p className="font-semibold text-slate-800">
            {system.processor.model}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {system.processor.cores} Cores
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {system.processor.clockSpeedGHz} GHz
          </p>
        </SystemCard>

        {/* Memory */}

        <SystemCard icon={<HardDrive size={24} />} title="Memory">
          <p className="text-3xl font-black text-emerald-700">
            {system.memory.totalGB} GB
          </p>

          <p className="mt-2 text-sm text-slate-500">Installed Memory</p>
        </SystemCard>

        {/* Network */}

        <SystemCard icon={<Network size={24} />} title="Network">
          <p className="font-semibold text-slate-800">
            {system.network.hostname}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {system.network.macAddress}
          </p>
        </SystemCard>

        {/* Identity */}

        <div className="md:col-span-2">
          <SystemCard icon={<ShieldCheck size={24} />} title="Machine Identity">
            <p className="font-semibold text-slate-800">Serial Number</p>

            <p className="mt-2 text-xl font-bold text-emerald-700">
              {system.identity.serialNumber}
            </p>
          </SystemCard>
        </div>
      </div>
    </div>
  );
}
