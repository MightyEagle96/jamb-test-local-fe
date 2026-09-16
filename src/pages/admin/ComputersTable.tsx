import {
  Monitor,
  Cpu,
  MemoryStick,
  Wifi,
  ShieldCheck,
  // CalendarDays,
  Search,
  X,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import httpService from "../../services/http.service";

import Swal from "sweetalert2";

export interface Computer {
  _id: string;

  centre: string;

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

    adapters: {
      name: string;
      macAddress: string;
      type: string;
    }[];
  };
  computerIdentifier: string;
  identity: {
    uuid: string;
    serialNumber: string;
    identityStrength:
      | "strongest"
      | "veryStrong"
      | "strong"
      | "unidentifiable"
      | string;
  };

  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  computers: Computer[];
  onRefresh: () => void;
}

// function ComputersTable({ computers, onRefresh }: Props) {
//   const [search, setSearch] = useState("");

//   const filteredComputers = useMemo(() => {
//     const query = search.trim().toLowerCase();

//     if (!query) {
//       return computers;
//     }

//     return computers.filter((computer) => {
//       return (
//         computer.operatingSystem.hostname?.toLowerCase().includes(query) ||
//         computer.operatingSystem.name?.toLowerCase().includes(query) ||
//         computer.processor.model?.toLowerCase().includes(query) ||
//         computer.network.macAddress?.toLowerCase().includes(query) ||
//         computer.identity.serialNumber?.toLowerCase().includes(query)
//       );
//     });
//   }, [computers, search]);

//   const formatDate = (date: string) => {
//     if (!date) return "—";

//     return new Date(date).toLocaleDateString("en-NG", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const deleteComputer = async (computer: Computer) => {
//     const result = await Swal.fire({
//       title: "Remove this computer?",
//       html: `
//       <div style="text-align: left;">
//         <p style="margin-bottom: 12px; color: #475569;">
//           This computer has <strong>not been registered or uploaded
//           to the cloud</strong> yet.
//         </p>

//         <p style="color: #64748b; font-size: 13px;">
//           Removing it will only remove it from the current list.
//           You can always scan and add this system again later.
//         </p>

//         <div style="
//           margin-top: 16px;
//           padding: 12px;
//           border-radius: 10px;
//           background: #f8fafc;
//           border: 1px solid #e2e8f0;
//         ">
//           <div style="
//             font-size: 11px;
//             font-weight: 600;
//             color: #94a3b8;
//             text-transform: uppercase;
//             letter-spacing: 0.05em;
//           ">
//             Computer
//           </div>

//           <div style="
//             margin-top: 4px;
//             font-size: 14px;
//             font-weight: 600;
//             color: #334155;
//           ">
//             ${computer.operatingSystem.hostname}
//           </div>

//           <div style="
//             margin-top: 4px;
//             font-family: monospace;
//             font-size: 11px;
//             color: #64748b;
//           ">
//             ${computer.identity.serialNumber}
//           </div>
//         </div>
//       </div>
//     `,

//       icon: "question",

//       showCancelButton: true,

//       confirmButtonText: "Yes, remove computer",
//       cancelButtonText: "Keep computer",

//       reverseButtons: true,

//       buttonsStyling: false,

//       customClass: {
//         popup: "rounded-3xl",
//         title: "text-xl font-bold text-slate-800",
//         htmlContainer: "text-slate-600",
//         confirmButton:
//           "rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800",
//         cancelButton:
//           "mr-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200",
//       },
//     });

//     if (!result.isConfirmed) {
//       return;
//     }

//     try {
//       // Your delete API call
//       await httpService.delete("/computers/deleteone", {
//         params: {
//           serialNumber: computer.identity.serialNumber,
//           macAddress: computer.network.macAddress,
//         },
//       });

//       await Swal.fire({
//         icon: "success",
//         title: "Computer removed",
//         text: "The computer has been removed successfully. You can add it again whenever needed.",
//         confirmButtonText: "Done",
//         buttonsStyling: false,
//         customClass: {
//           popup: "rounded-3xl",
//           title: "text-xl font-bold text-slate-800",
//           confirmButton:
//             "rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800",
//         },
//       });

//       onRefresh();

//       // Refresh your computer list here
//       // await getComputers();
//     } catch (error: any) {
//       console.error(
//         "Failed to remove computer:",
//         error.response?.data || error.message,
//       );

//       await Swal.fire({
//         icon: "error",
//         title: "Unable to remove computer",
//         text:
//           error.response?.data?.message ||
//           "Something went wrong while removing this computer.",
//         confirmButtonText: "Close",
//         buttonsStyling: false,
//         customClass: {
//           popup: "rounded-3xl",
//           title: "text-xl font-bold text-slate-800",
//           confirmButton:
//             "rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white",
//         },
//       });
//     }
//   };

//   return (
//     <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
//       {/* =====================================================
//           HEADER
//       ===================================================== */}

//       <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
//         <div>
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
//               <Monitor size={20} />
//             </div>

//             <div>
//               <h2 className="text-sm font-bold text-slate-800">
//                 Registered Computers
//               </h2>

//               <p className="mt-0.5 text-xs text-slate-400">
//                 Systems registered with the JAMB Test Agent
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
//           {/* Search */}

//           <div className="relative">
//             <Search
//               size={15}
//               className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//             />

//             <input
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search computers..."
//               className="
//                 h-9
//                 w-full
//                 rounded-xl
//                 border
//                 border-slate-200
//                 bg-white
//                 pl-9
//                 pr-9
//                 text-xs
//                 font-medium
//                 text-slate-700
//                 outline-none
//                 transition
//                 placeholder:text-slate-400
//                 focus:border-emerald-400
//                 focus:ring-2
//                 focus:ring-emerald-500/10
//                 sm:w-60
//               "
//             />

//             {search && (
//               <button
//                 type="button"
//                 onClick={() => setSearch("")}
//                 className="
//                   absolute
//                   right-2.5
//                   top-1/2
//                   -translate-y-1/2
//                   rounded-md
//                   p-1
//                   text-slate-400
//                   hover:bg-slate-100
//                   hover:text-slate-600
//                 "
//               >
//                 <X size={14} />
//               </button>
//             )}
//           </div>

//           {/* Count */}

//           <div className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
//             <Monitor size={13} />
//             {search
//               ? `${filteredComputers.length} of ${computers.length}`
//               : `${computers.length}`}{" "}
//             Systems
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           TABLE
//       ===================================================== */}

//       <div className="max-h-[60vh] overflow-auto">
//         <table className="w-full min-w-[1050px] text-left">
//           {/* HEADER */}

//           <thead className="sticky top-0 z-10">
//             <tr className="border-b border-slate-100 bg-slate-50">
//               <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Computer
//               </th>

//               <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Operating System
//               </th>

//               <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Processor
//               </th>

//               <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 RAM
//               </th>

//               <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Network
//               </th>

//               <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Serial Number
//               </th>

//               <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Registered
//               </th>
//               <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Action
//               </th>
//             </tr>
//           </thead>

//           {/* BODY */}

//           <tbody className="divide-y divide-slate-100">
//             {filteredComputers.length === 0 ? (
//               <tr>
//                 <td colSpan={7} className="px-5 py-16 text-center">
//                   <Monitor size={32} className="mx-auto text-slate-300" />

//                   <p className="mt-3 text-sm font-medium text-slate-500">
//                     {search
//                       ? "No matching computers found"
//                       : "No computers registered"}
//                   </p>

//                   <p className="mt-1 text-xs text-slate-400">
//                     {search
//                       ? `Nothing matches "${search}".`
//                       : "Registered systems will appear here."}
//                   </p>

//                   {search && (
//                     <button
//                       type="button"
//                       onClick={() => setSearch("")}
//                       className="mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
//                     >
//                       Clear search
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ) : (
//               filteredComputers.map((computer, index) => (
//                 <tr
//                   key={computer._id}
//                   className="group transition hover:bg-slate-50/70"
//                 >
//                   {/* COMPUTER */}

//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
//                         <Monitor size={17} />
//                       </div>

//                       <div className="min-w-0">
//                         <p className="text-sm font-semibold text-slate-700">
//                           {computer.operatingSystem.hostname}
//                         </p>

//                         <p className="mt-0.5 font-mono text-[10px] text-slate-400">
//                           System {index + 1}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* OS */}

//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2">
//                       <Monitor size={14} className="shrink-0 text-slate-400" />

//                       <div className="min-w-0">
//                         <p className="text-xs font-semibold text-slate-700">
//                           {computer.operatingSystem.name}
//                         </p>

//                         <p className="mt-0.5 text-[10px] text-slate-400">
//                           Version {computer.operatingSystem.version}
//                           {" • "}
//                           {computer.operatingSystem.architecture}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* PROCESSOR */}

//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2">
//                       <Cpu size={14} className="shrink-0 text-slate-400" />

//                       <div className="min-w-0 max-w-[230px]">
//                         <p className="truncate text-xs font-semibold text-slate-700">
//                           {computer.processor.model}
//                         </p>

//                         <p className="mt-0.5 text-[10px] text-slate-400">
//                           {computer.processor.cores} Cores
//                           {" • "}
//                           {computer.processor.clockSpeedGHz.toFixed(2)} GHz
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* RAM */}

//                   <td className="px-5 py-4 text-center">
//                     <div className="inline-flex items-center gap-2">
//                       <MemoryStick size={14} className="text-slate-400" />

//                       <span className="text-xs font-bold text-slate-700">
//                         {computer.memory.totalGB} GB
//                       </span>
//                     </div>
//                   </td>

//                   {/* NETWORK */}

//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2">
//                       <Wifi size={14} className="shrink-0 text-slate-400" />

//                       <div>
//                         <p className="font-mono text-xs font-semibold text-slate-600">
//                           {computer.network.macAddress}
//                         </p>

//                         <p className="mt-0.5 text-[10px] text-slate-400">
//                           {computer.network.hostname}
//                         </p>
//                       </div>
//                     </div>
//                   </td>

//                   {/* SERIAL */}

//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2">
//                       <ShieldCheck size={14} className="text-slate-400" />

//                       <span className="font-mono text-xs font-semibold text-slate-600">
//                         {computer.identity.serialNumber}
//                       </span>
//                     </div>
//                   </td>

//                   {/* DATE */}

//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-2">
//                       <CalendarDays size={14} className="text-slate-400" />

//                       <span className="whitespace-nowrap text-xs font-medium text-slate-500">
//                         {formatDate(computer.createdAt)}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="px-5 py-4 text-right">
//                     {!computer._id ? (
//                       <button
//                         type="button"
//                         onClick={() => deleteComputer(computer)}
//                         className="
//         inline-flex
//         h-8
//         w-8
//         items-center
//         justify-center
//         rounded-lg
//         text-slate-400
//         transition
//         hover:bg-red-50
//         hover:text-red-600
//       "
//                         title="Remove detected computer"
//                       >
//                         <Trash2 size={16} />
//                       </button>
//                     ) : (
//                       <div
//                         className="
//         inline-flex
//         h-8
//         w-8
//         items-center
//         justify-center
//         rounded-lg
//         text-slate-300
//       "
//                         title="Registered computers cannot be removed"
//                       >
//                         <ShieldCheck size={15} />
//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

function ComputersTable({ computers, onRefresh }: Props) {
  const [search, setSearch] = useState("");

  // =========================================================
  // HELPERS
  // =========================================================

  const getEthernetAdapters = (computer: Computer) => {
    return (
      computer.network?.adapters?.filter(
        (adapter) =>
          adapter.type?.toLowerCase() === "ethernet" &&
          adapter.macAddress?.trim(),
      ) || []
    );
  };

  const getWifiAdapters = (computer: Computer) => {
    return (
      computer.network?.adapters?.filter(
        (adapter) =>
          adapter.type?.toLowerCase() === "wifi" && adapter.macAddress?.trim(),
      ) || []
    );
  };

  // const formatDate = (date?: string) => {
  //   if (!date) return "—";

  //   return new Date(date).toLocaleDateString("en-NG", {
  //     day: "2-digit",
  //     month: "short",
  //     year: "numeric",
  //   });
  // };

  // =========================================================
  // IDENTITY STRENGTH
  // =========================================================

  const getIdentityStrength = (computer: Computer) => {
    const strength = computer.identity?.identityStrength;

    switch (strength) {
      case "strongest":
        return {
          label: "Strongest",
          description: "UUID + Serial + MAC",
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
        };

      case "veryStrong":
        return {
          label: "Very Strong",
          description: "Hardware identity + MAC",
          className: "bg-blue-50 text-blue-700 border-blue-200",
        };

      case "strong":
        return {
          label: "Strong",
          description: "Reliable hardware identity",
          className: "bg-indigo-50 text-indigo-700 border-indigo-200",
        };

      case "unidentifiable":
        return {
          label: "Unidentifiable",
          description: "No reliable identity",
          className: "bg-amber-50 text-amber-700 border-amber-200",
        };

      default:
        return {
          label: "Unknown",
          description: "Identity not classified",
          className: "bg-slate-50 text-slate-600 border-slate-200",
        };
    }
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredComputers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return computers;
    }

    return computers.filter((computer) => {
      const hostname = computer.operatingSystem?.hostname?.toLowerCase() || "";

      const os = computer.operatingSystem?.name?.toLowerCase() || "";

      const processor = computer.processor?.model?.toLowerCase() || "";

      const uuid = computer.identity?.uuid?.toLowerCase() || "";

      const serial = computer.identity?.serialNumber?.toLowerCase() || "";

      const identityStrength =
        computer.identity?.identityStrength?.toLowerCase() || "";

      const networkHostname = computer.network?.hostname?.toLowerCase() || "";

      const macAddresses =
        computer.network?.adapters
          ?.map((adapter) => adapter.macAddress?.toLowerCase())
          .filter(Boolean)
          .join(" ") || "";

      return (
        hostname.includes(query) ||
        os.includes(query) ||
        processor.includes(query) ||
        uuid.includes(query) ||
        serial.includes(query) ||
        identityStrength.includes(query) ||
        networkHostname.includes(query) ||
        macAddresses.includes(query)
      );
    });
  }, [computers, search]);

  // =========================================================
  // DELETE
  // =========================================================

  const deleteComputer = async (computer: Computer) => {
    const ethernetAdapters = getEthernetAdapters(computer);

    const result = await Swal.fire({
      title: "Remove this computer?",

      html: `
        <div style="text-align: left;">
          <p style="margin-bottom: 12px; color: #475569;">
            This computer has <strong>not been registered or uploaded
            to the cloud</strong> yet.
          </p>

          <p style="color: #64748b; font-size: 13px;">
            Removing it will only remove it from the current list.
            You can always scan and add this system again later.
          </p>

          <div style="
            margin-top: 16px;
            padding: 12px;
            border-radius: 10px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
          ">
            <div style="
              font-size: 11px;
              font-weight: 600;
              color: #94a3b8;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            ">
              Computer
            </div>

            <div style="
              margin-top: 4px;
              font-size: 14px;
              font-weight: 600;
              color: #334155;
            ">
              ${computer.operatingSystem.hostname || "Unknown"}
            </div>

            <div style="
              margin-top: 4px;
              font-family: monospace;
              font-size: 11px;
              color: #64748b;
            ">
              ${
                computer.identity.serialNumber ||
                computer.identity.uuid ||
                ethernetAdapters[0]?.macAddress ||
                "No identity available"
              }
            </div>
          </div>
        </div>
      `,

      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Yes, remove computer",
      cancelButtonText: "Keep computer",

      reverseButtons: true,

      buttonsStyling: false,

      customClass: {
        popup: "rounded-3xl",
        title: "text-xl font-bold text-slate-800",
        htmlContainer: "text-slate-600",

        confirmButton:
          "rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800",

        cancelButton:
          "mr-2 rounded-xl bg-slate-100 px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await httpService.delete("/computers/deleteone", {
        params: {
          computerIdentifier: computer.computerIdentifier,
        },
      });

      await Swal.fire({
        icon: "success",

        title: "Computer removed",

        text: "The computer has been removed successfully. You can add it again whenever needed.",

        confirmButtonText: "Done",

        buttonsStyling: false,

        customClass: {
          popup: "rounded-3xl",

          title: "text-xl font-bold text-slate-800",

          confirmButton:
            "rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white",
        },
      });

      onRefresh();
    } catch (error: any) {
      console.error(
        "Failed to remove computer:",
        error.response?.data || error.message,
      );

      await Swal.fire({
        icon: "error",

        title: "Unable to remove computer",

        text:
          error.response?.data?.message ||
          "Something went wrong while removing this computer.",

        confirmButtonText: "Close",

        buttonsStyling: false,

        customClass: {
          popup: "rounded-3xl",

          title: "text-xl font-bold text-slate-800",

          confirmButton:
            "rounded-xl bg-emerald-700 px-5 py-3 text-sm font-bold text-white",
        },
      });
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <Monitor size={20} />
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-800">
                Registered Computers
              </h2>

              <p className="mt-0.5 text-xs text-slate-400">
                Systems registered with the JAMB Test Agent
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          {/* SEARCH */}

          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search computers..."
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
                sm:w-64
              "
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="
                  absolute
                  right-2.5
                  top-1/2
                  -translate-y-1/2
                  rounded-md
                  p-1
                  text-slate-400
                  hover:bg-slate-100
                  hover:text-slate-600
                "
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* COUNT */}

          <div className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            <Monitor size={13} />
            {search
              ? `${filteredComputers.length} of ${computers.length}`
              : computers.length}{" "}
            Systems
          </div>
        </div>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="max-h-[60vh] overflow-auto">
        <table className="w-full min-w-[1250px] text-left">
          {/* HEADER */}

          <thead className="sticky top-0 z-10">
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Computer
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Identity
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Operating System
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Processor
              </th>

              <th className="px-5 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400">
                RAM
              </th>

              <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Network
              </th>

              {/* <th className="px-5 py-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Registered
              </th> */}

              <th className="px-5 py-3 text-right text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          {/* BODY */}

          <tbody className="divide-y divide-slate-100">
            {filteredComputers.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-5 py-16 text-center">
                  <Monitor size={32} className="mx-auto text-slate-300" />

                  <p className="mt-3 text-sm font-medium text-slate-500">
                    {search
                      ? "No matching computers found"
                      : "No computers registered"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {search
                      ? `Nothing matches "${search}".`
                      : "Registered systems will appear here."}
                  </p>

                  {search && (
                    <button
                      type="button"
                      onClick={() => setSearch("")}
                      className="mt-4 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                    >
                      Clear search
                    </button>
                  )}
                </td>
              </tr>
            ) : (
              filteredComputers.map((computer, index) => {
                const ethernetAdapters = getEthernetAdapters(computer);

                const wifiAdapters = getWifiAdapters(computer);

                const identity = getIdentityStrength(computer);

                return (
                  <tr
                    key={computer._id || `${computer.identity.uuid}-${index}`}
                    className="group transition hover:bg-slate-50/70"
                  >
                    {/* =================================================
                        COMPUTER
                    ================================================= */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                          <Monitor size={17} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-700">
                            {computer.operatingSystem.hostname ||
                              "Unknown Computer"}
                          </p>

                          <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                            System {index + 1}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* =================================================
                        IDENTITY
                    ================================================= */}

                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        {/* Strength */}

                        <div
                          className={`
                            inline-flex
                            items-center
                            rounded-lg
                            border
                            px-2
                            py-1
                            text-[10px]
                            font-bold
                            ${identity.className}
                          `}
                          title={identity.description}
                        >
                          <ShieldCheck size={12} className="mr-1.5" />

                          {identity.label}
                        </div>

                        {/* UUID */}

                        {computer.identity.uuid ? (
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                              UUID
                            </p>

                            <p className="mt-0.5 max-w-[210px] truncate font-mono text-[10px] font-semibold text-slate-600">
                              {computer.identity.uuid}
                            </p>
                          </div>
                        ) : (
                          <p className="text-[10px] italic text-slate-400">
                            UUID unavailable
                          </p>
                        )}

                        {/* Serial */}

                        {computer.identity.serialNumber ? (
                          <div>
                            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                              Serial
                            </p>

                            <p className="mt-0.5 font-mono text-[10px] font-semibold text-slate-600">
                              {computer.identity.serialNumber}
                            </p>
                          </div>
                        ) : (
                          <p className="text-[10px] italic text-slate-400">
                            Serial unavailable
                          </p>
                        )}
                      </div>
                    </td>

                    {/* =================================================
                        OPERATING SYSTEM
                    ================================================= */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Monitor
                          size={14}
                          className="shrink-0 text-slate-400"
                        />

                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-700">
                            {computer.operatingSystem.name || "Unknown OS"}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            Version {computer.operatingSystem.version || "—"}
                            {" • "}
                            {computer.operatingSystem.architecture || "—"}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* =================================================
                        PROCESSOR
                    ================================================= */}

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <Cpu size={14} className="shrink-0 text-slate-400" />

                        <div className="min-w-0 max-w-[230px]">
                          <p className="truncate text-xs font-semibold text-slate-700">
                            {computer.processor.model || "Unknown processor"}
                          </p>

                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {computer.processor.cores} Cores
                            {" • "}
                            {computer.processor.threads} Threads
                            {" • "}
                            {computer.processor.clockSpeedGHz?.toFixed(2)} GHz
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* =================================================
                        RAM
                    ================================================= */}

                    <td className="px-5 py-4 text-center">
                      <div className="inline-flex items-center gap-2">
                        <MemoryStick size={14} className="text-slate-400" />

                        <span className="text-xs font-bold text-slate-700">
                          {computer.memory.totalGB} GB
                        </span>
                      </div>
                    </td>

                    {/* =================================================
                        NETWORK
                    ================================================= */}

                    <td className="px-5 py-4">
                      <div className="space-y-2">
                        {/* Ethernet */}

                        {ethernetAdapters.length > 0 ? (
                          <div>
                            <div className="mb-1 flex items-center gap-1.5">
                              <Wifi size={12} className="text-emerald-600" />

                              <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                                Ethernet
                              </span>
                            </div>

                            <div className="space-y-1">
                              {ethernetAdapters.map((adapter, adapterIndex) => (
                                <div
                                  key={`${adapter.macAddress}-${adapterIndex}`}
                                  className="font-mono text-[10px] font-semibold text-slate-600"
                                >
                                  {adapter.macAddress}
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-[10px] italic text-slate-400">
                            No Ethernet adapter
                          </p>
                        )}

                        {/* Wi-Fi */}

                        {wifiAdapters.length > 0 && (
                          <div>
                            <div className="mb-1 flex items-center gap-1.5">
                              <Wifi size={12} className="text-slate-400" />

                              <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                Wi-Fi
                              </span>
                            </div>

                            <div className="space-y-1">
                              {wifiAdapters.map((adapter, adapterIndex) => (
                                <div
                                  key={`${adapter.macAddress}-${adapterIndex}`}
                                  className="font-mono text-[10px] text-slate-500"
                                >
                                  {adapter.macAddress}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="text-[10px] text-slate-400">
                          {computer.network.hostname}
                        </p>
                      </div>
                    </td>

                    {/* =================================================
                        REGISTERED
                    ================================================= */}

                    {/* <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays size={14} className="text-slate-400" />

                        <span className="whitespace-nowrap text-xs font-medium text-slate-500">
                          {formatDate(computer.createdAt)}
                        </span>
                      </div>
                    </td> */}

                    {/* =================================================
                        ACTION
                    ================================================= */}

                    <td className="px-5 py-4 text-right">
                      {!computer._id ? (
                        <button
                          type="button"
                          onClick={() => deleteComputer(computer)}
                          className="
                            inline-flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-400
                            transition
                            hover:bg-red-50
                            hover:text-red-600
                          "
                          title="Remove detected computer"
                        >
                          <Trash2 size={16} />
                        </button>
                      ) : (
                        <div
                          className="
                            inline-flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            rounded-lg
                            text-slate-300
                          "
                          title="Registered computers cannot be removed"
                        >
                          <ShieldCheck size={15} />
                        </div>
                      )}
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

export default ComputersTable;
