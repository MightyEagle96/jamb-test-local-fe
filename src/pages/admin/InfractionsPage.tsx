import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { AlertTriangle } from "lucide-react";
import httpService from "../../services/http.service";
import { useEffect, useState } from "react";

function InfractionsPage() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 50,
  });

  const [infractions, setInfractions] = useState([]);
  const [infractionsCount, setInfractionsCount] = useState(0);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
      headerAlign: "center",
      align: "center",
    },

    {
      field: "serialNumber",
      headerName: "Serial Number",
      flex: 1,
      minWidth: 160,
      valueGetter: (_, row) => row.computer?.serialNumber ?? "—",
    },

    {
      field: "macAddress",
      headerName: "MAC Address",
      flex: 1,
      minWidth: 170,
      valueGetter: (_, row) => row.computer?.macAddress ?? "—",
    },

    // {
    //   field: "referenceNumber",
    //   headerName: "",
    //   flex: 1,
    //   minWidth: 180,
    //   valueGetter: (_, row) => row.principal?.referenceNumber ?? "—",
    // },

    {
      field: "centreName",
      headerName: "Principal Centre",
      flex: 1.6,
      minWidth: 280,
      valueGetter: (_, row) => row.principal?.centreName ?? "—",
    },

    {
      field: "centresInvolved",
      headerName: "Centres Involved",
      width: 150,
      headerAlign: "center",
      align: "center",

      renderCell: (params) => (
        <span
          className="
          inline-flex
          items-center
          rounded-full
          bg-red-100
          px-3
          py-1
          text-xs
          font-bold
          text-red-700
        "
        >
          {params.value} Centres
        </span>
      ),
    },

    {
      field: "createdAt",
      headerName: "Detected",
      width: 150,

      valueGetter: (_, row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "—",
    },

    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 100,
    //   sortable: false,
    //   filterable: false,

    //   renderCell: (params) => (
    //     <button
    //       onClick={() => {
    //         console.log("View infraction:", params.row);
    //       }}
    //       className="
    //       flex
    //       h-9
    //       w-9
    //       items-center
    //       justify-center
    //       rounded-xl
    //       text-slate-500
    //       transition
    //       hover:bg-emerald-50
    //       hover:text-emerald-700
    //     "
    //     >
    //       <Eye size={18} />
    //     </button>
    //   ),
    // },
  ];
  const getInfractions = async () => {
    try {
      const { data } = await httpService.get("/centres/infractions", {
        params: {
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        },
      });

      setInfractions(data.data);
      setInfractionsCount(data.infractionsCount);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    getInfractions();
  }, [paginationModel]);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}

      <div className="mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <AlertTriangle size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-black text-slate-800">
              Infractions ({infractionsCount})
            </h1>

            <p className="mt-1 text-slate-500">
              Review and monitor examination centre infractions.
            </p>
          </div>
        </div>
      </div>

      {/* DataGrid */}

      <div className="rounded-3xl border border-slate-200 bg-white p-2 shadow-sm">
        {/* <div className="mb-4 flex items-center justify-between px-2">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Infraction Records
            </h2>

            <p className="text-sm text-slate-500">
              Detected violations associated with registered computers.
            </p>
          </div>
        </div> */}

        <div className="w-full">
          <DataGrid
            rows={infractions}
            columns={columns}
            // getRowId={(row) => row._id}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            autoHeight
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                  page: 0,
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
    </div>
  );
}

export default InfractionsPage;
