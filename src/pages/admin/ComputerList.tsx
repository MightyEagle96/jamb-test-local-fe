import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { CheckCircle2, Eye, Monitor } from "lucide-react";
import httpService from "../../services/http.service";
import ComputersTable from "./ComputersTable";

interface Computer {
  _id?: string;

  operatingSystem: {
    name: string;
    edition: string;
    version: string;
    buildNumber: string;
    architecture: string;
    kernelVersion: string;
    hostname: string;
  };

  processor: {
    manufacturer: string;
    model: string;
    cores: number;
    threads: number;
    clockSpeedGHz: number;
  };

  memory: {
    totalBytes: number;
    totalGB: number;
  };

  network: {
    hostname: string;
    macAddress: string;
  };

  identity: {
    serialNumber: string;
  };
}

function ComputerList() {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComputers = async () => {
    try {
      const response = await httpService("computers/getall");

      setComputers(response.data.data);
      console.log(response.data);

      //setComputers(result.data ?? []);
    } catch (error) {
      console.error("Failed to fetch computers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComputers();
  }, []);

  return (
    <>
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              bg-emerald-100
              text-emerald-700
            "
            >
              <Monitor size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-black text-slate-800">Computers</h1>

              <p className="mt-1 text-slate-500">
                View and manage computers registered to this CBT centre.
              </p>
            </div>
          </div>
        </div>

        {/* Grid */}
      </div>
      <div className="px-3">
        <ComputersTable
          computers={computers as any}
          onRefresh={fetchComputers}
        />
      </div>
    </>
  );
}

export default ComputerList;
