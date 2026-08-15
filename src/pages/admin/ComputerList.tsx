import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { CheckCircle2, Eye, Monitor } from "lucide-react";

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

  useEffect(() => {
    const fetchComputers = async () => {
      try {
        const response = await fetch("/api/computers");

        if (!response.ok) {
          throw new Error("Unable to fetch computers.");
        }

        const result = await response.json();

        setComputers(result.data ?? []);
      } catch (error) {
        console.error("Failed to fetch computers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComputers();
  }, []);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerAlign: "center",
      align: "center",

      valueGetter: (_, row) => row._id ?? "—",
    },

    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
      minWidth: 170,

      valueGetter: (_, row) => row.identity?.serialNumber ?? "—",
    },

    {
      field: "macAddress",
      headerName: "MAC Address",
      flex: 1,
      minWidth: 180,

      valueGetter: (_, row) => row.network?.macAddress ?? "—",
    },

    {
      field: "hostname",
      headerName: "Hostname",
      flex: 1,
      minWidth: 170,

      valueGetter: (_, row) =>
        row.network?.hostname || row.operatingSystem?.hostname || "—",
    },

    {
      field: "operatingSystem",
      headerName: "Operating System",
      flex: 1.3,
      minWidth: 220,

      valueGetter: (_, row) => {
        const os = row.operatingSystem;

        if (!os) return "—";

        return `${os.name} ${os.edition || ""}`.trim();
      },
    },

    {
      field: "osVersion",
      headerName: "Version",
      width: 110,

      valueGetter: (_, row) => row.operatingSystem?.version ?? "—",
    },

    {
      field: "processor",
      headerName: "Processor",
      flex: 1.3,
      minWidth: 230,

      valueGetter: (_, row) => {
        const processor = row.processor;

        if (!processor) return "—";

        return `${processor.manufacturer} ${processor.model}`;
      },
    },

    {
      field: "cores",
      headerName: "Cores",
      width: 90,
      headerAlign: "center",
      align: "center",

      valueGetter: (_, row) => row.processor?.cores ?? 0,
    },

    {
      field: "memory",
      headerName: "RAM",
      width: 100,
      headerAlign: "center",
      align: "center",

      valueGetter: (_, row) =>
        row.memory?.totalGB ? `${row.memory.totalGB} GB` : "—",
    },

    {
      field: "architecture",
      headerName: "Architecture",
      width: 120,

      valueGetter: (_, row) => row.operatingSystem?.architecture ?? "—",
    },

    {
      field: "status",
      headerName: "Status",
      width: 130,

      renderCell: () => (
        <span
          className="
            inline-flex
            items-center
            gap-1.5
            rounded-full
            bg-emerald-100
            px-3
            py-1
            text-xs
            font-bold
            text-emerald-700
          "
        >
          <CheckCircle2 size={14} />
          Registered
        </span>
      ),
    },

    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      filterable: false,

      renderCell: (params) => (
        <button
          onClick={() => {
            console.log("View computer:", params.row);
          }}
          className="
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-xl
            text-slate-500
            transition
            hover:bg-emerald-50
            hover:text-emerald-700
          "
          title="View computer"
        >
          <Eye size={18} />
        </button>
      ),
    },
  ];

  return (
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

      <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
        {/* <div className="mb-4 px-2">
          <h2 className="text-lg font-bold text-slate-800">
            Registered Computers
          </h2>

          <p className="text-sm text-slate-500">
            Hardware and system information for computers associated with this
            centre.
          </p>
        </div> */}

        <DataGrid
          rows={computers}
          columns={columns}
          getRowId={(row) =>
            row._id ??
            `${row.identity?.serialNumber}-${row.network?.macAddress}`
          }
          loading={loading}
          autoHeight
          disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                page: 0,
                pageSize: 10,
              },
            },
          }}
          sx={{
            border: 0,

            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f8fafc",
              borderBottom: "1px solid #e2e8f0",
            },

            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #f1f5f9",
            },

            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#f8fafc",
            },

            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #e2e8f0",
            },
          }}
        />
      </div>
    </div>
  );
}

export default ComputerList;
