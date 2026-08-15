import { useEffect, useState } from "react";
import {
  Activity,
  Clock3,
  Network,
  Play,
  ShieldCheck,
  Trash2,
  Eye,
  ChevronDown,
} from "lucide-react";
import Swal from "sweetalert2";
import httpService from "../../services/http.service";
import { toastError } from "../../components/CustomToast";
import { toast } from "sonner";

export interface NetworkTest {
  _id: string;
  createdAt: string;
  updatedAt: string;

  duration: number;
  examId: string;

  connectedComputers: number;
  active: boolean;

  dateCreated: string;

  maxResponses: number;

  ended: boolean;

  totalNetworkLosses: number;
  computersWithNetworkLosses: number;
  endedComputers: number;
  lostInTransport: number;

  responseThroughput: string;

  centre: string;

  status: "pending" | "active" | "ended" | "uploaded";
}
function NetworkTest() {
  const [duration, setDuration] = useState<number>(30);
  const [creating, setCreating] = useState(false);
  const [networkTests, setNetworkTests] = useState<NetworkTest[]>([]);
  const [openAction, setOpenAction] = useState<string | null>(null);

  const createNetworkTest = async () => {
    if (!duration || duration <= 0) {
      return;
    }

    const isShortTest = duration < 60;

    const result = await Swal.fire({
      title: "Confirm Network Test",
      html: `
      <div class="text-left">
        <div class="mb-5 rounded-2xl bg-emerald-50 p-5">
          <p class="text-sm text-slate-500">
            Test Duration
          </p>

          <p class="mt-1 text-3xl font-bold text-emerald-700">
            ${duration} minutes
          </p>
        </div>

        ${
          isShortTest
            ? `
              <div class="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <p class="font-semibold text-amber-800">
                  Important Notice
                </p>

                <p class="mt-2 text-sm leading-6 text-amber-700">
                  Tests lasting less than 60 minutes will not have their
                  results uploaded to the central server.
                </p>
              </div>
            `
            : `
              <p class="text-sm leading-6 text-slate-600">
                You are about to create a ${duration}-minute network test.
                Please confirm that this duration is correct before
                continuing.
              </p>
            `
        }
      </div>
    `,

      icon: isShortTest ? "warning" : "question",

      showCancelButton: true,

      confirmButtonText: "Confirm & Create Test",
      cancelButtonText: "Cancel",

      reverseButtons: true,

      buttonsStyling: false,

      customClass: {
        popup: "rounded-3xl",
        title: "text-xl font-bold text-slate-800",
        htmlContainer: "text-slate-600",

        confirmButton:
          "ml-3 rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800",

        cancelButton:
          "rounded-xl bg-slate-100 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-200",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setCreating(true);
      const { data } = await httpService.post("/network-test/create", {
        duration,
      });

      viewNetworkTest();
      // We'll connect this to the API shortly.
      toast.success(data.message);
    } catch (error) {
      toastError(error);
    } finally {
      setCreating(false);
    }
  };

  const viewNetworkTest = async () => {
    try {
      const { data } = await httpService.get("/network-test/view_all");
      console.log(data);
      setNetworkTests(data);
    } catch (error) {
      toastError(error);
    }
  };

  const deleteNetworkTest = async (examId: string) => {
    try {
      await httpService.delete(`/network-test/delete/${examId}`);

      toast.success("Network test deleted.");

      setNetworkTests((current) =>
        current.filter((test) => test._id !== examId),
      );
    } catch (error) {
      console.error("Failed to delete network test:", error);
      toastError(error);
    }
  };

  useEffect(() => {
    viewNetworkTest();
  }, []);

  useEffect(() => {
    const handleClickOutside = () => {
      setOpenAction(null);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
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
            <Network size={24} />
          </div>

          <div>
            <h1 className="text-3xl font-black text-slate-800">Network Test</h1>

            <p className="mt-1 text-slate-500">
              Create and monitor network performance tests for your CBT centre.
            </p>
          </div>
        </div>
      </div>

      {/* Create Test */}

      <div
        className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          sm:p-8
        "
      >
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-emerald-50
                text-emerald-700
              "
            >
              <Activity size={20} />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                Create Network Test
              </h2>

              <p className="text-sm text-slate-500">
                Configure the duration of the network simulation.
              </p>
            </div>
          </div>
        </div>

        {/* Information */}

        <div
          className="
            mb-8
            rounded-2xl
            border
            border-emerald-100
            bg-emerald-50/70
            p-5
          "
        >
          <div className="flex gap-4">
            <ShieldCheck
              size={22}
              className="mt-0.5 shrink-0 text-emerald-600"
            />

            <div>
              <h3 className="font-semibold text-emerald-800">
                Network Simulation
              </h3>

              <p className="mt-1 text-sm leading-6 text-emerald-700">
                The network test will measure the connectivity and response
                performance of computers connected to this centre during the
                selected period.
              </p>
            </div>
          </div>
        </div>

        {/* Duration */}

        <div className="max-w-md">
          <label
            htmlFor="duration"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Test Duration
          </label>

          <div className="relative">
            <Clock3
              size={19}
              className="
                pointer-events-none
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              id="duration"
              type="number"
              min={1}
              max={1440}
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="
                w-full
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                py-4
                pl-12
                pr-20
                text-slate-800
                outline-none
                transition
                focus:border-emerald-500
                focus:bg-white
                focus:ring-4
                focus:ring-emerald-500/10
              "
            />

            <span
              className="
                pointer-events-none
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-sm
                font-medium
                text-slate-400
              "
            >
              minutes
            </span>
          </div>

          <p className="mt-2 text-xs text-slate-400">
            Any network test duration less than 60 minutes will not be uploaded.
          </p>
        </div>

        {/* Create Button */}

        <div className="mt-8">
          <button
            onClick={createNetworkTest}
            disabled={creating || !duration || duration <= 0}
            className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-emerald-700
              to-green-600
              px-6
              py-4
              font-semibold
              text-white
              shadow-sm
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:shadow-lg
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:translate-y-0
              disabled:hover:shadow-sm
            "
          >
            <Play size={18} />

            {creating ? "Creating Test..." : "Create Network Test"}
          </button>
        </div>
      </div>

      {/* Existing Tests */}

      <div className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800">Network Tests</h2>

          <p className="mt-1 text-sm text-slate-500">
            Previous and active network tests for your centre.
          </p>
        </div>

        <div
          className="
      overflow-hidden
      rounded-3xl
      border
      border-slate-200
      bg-white
      shadow-sm
    "
        >
          {networkTests.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center p-6">
              <div className="text-center">
                <Network size={40} className="mx-auto text-slate-300" />

                <p className="mt-3 font-medium text-slate-500">
                  No network tests yet
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  Your network tests will appear here.
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px]">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Network Test
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Duration
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Computers
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Network Losses
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Throughput
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {networkTests.map((test) => (
                    <tr
                      key={test.examId}
                      className="transition hover:bg-slate-50"
                    >
                      {/* Test ID */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-slate-800">
                            Test ID
                          </p>

                          <p className="mt-1 font-mono text-xs text-slate-400">
                            {test.examId}
                          </p>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="px-6 py-5">
                        <span className="font-medium text-slate-700">
                          {test.duration} min
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <StatusBadge status={test.status} />
                      </td>

                      {/* Computers */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="font-semibold text-slate-700">
                            {test.connectedComputers}
                          </p>

                          <p className="text-xs text-slate-400">connected</p>
                        </div>
                      </td>

                      {/* Network losses */}
                      <td className="px-6 py-5">
                        <div>
                          <p
                            className={`font-semibold ${
                              test.totalNetworkLosses > 0
                                ? "text-red-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {test.totalNetworkLosses}
                          </p>

                          <p className="text-xs text-slate-400">total losses</p>
                        </div>
                      </td>

                      {/* Throughput */}
                      <td className="px-6 py-5">
                        <span className="font-semibold text-slate-700">
                          {test.responseThroughput}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5">
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {new Date(test.dateCreated).toLocaleDateString()}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {new Date(test.dateCreated).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </td>
                      <td className="relative px-6 py-5">
                        <div
                          className="relative inline-block"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenAction(
                                openAction === test.examId ? null : test.examId,
                              )
                            }
                            className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        border
        border-slate-200
        bg-white
        px-3
        py-2
        text-sm
        font-semibold
        text-slate-600
        shadow-sm
        transition
        hover:border-emerald-200
        hover:bg-emerald-50
        hover:text-emerald-700
      "
                          >
                            Actions
                            <ChevronDown
                              size={15}
                              className={`
          transition-transform
          ${openAction === test.examId ? "rotate-180" : ""}
        `}
                            />
                          </button>

                          {openAction === test.examId && (
                            <div
                              className="
          absolute
          right-0
          z-50
          mt-2
          w-44
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-1.5
          shadow-xl
        "
                            >
                              {/* View */}
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenAction(null);

                                  console.log("View network test:", test);

                                  // Open your view modal here
                                }}
                                className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-left
            text-sm
            font-medium
            text-slate-600
            transition
            hover:bg-emerald-50
            hover:text-emerald-700
          "
                              >
                                <Eye size={17} />
                                View
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                disabled={test.status === "uploaded"}
                                onClick={() => {
                                  setOpenAction(null);
                                  deleteNetworkTest(test._id);
                                }}
                                title={
                                  test.status === "uploaded"
                                    ? "Uploaded tests cannot be deleted"
                                    : "Delete network test"
                                }
                                className={`
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-left
            text-sm
            font-medium
            transition

            ${
              test.status === "uploaded"
                ? "cursor-not-allowed text-slate-300"
                : "text-red-500 hover:bg-red-50 hover:text-red-600"
            }
          `}
                              >
                                <Trash2 size={17} />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default NetworkTest;

interface StatusBadgeProps {
  status: NetworkTest["status"];
}

function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    pending: {
      wrapper: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
      label: "Pending",
    },

    active: {
      wrapper: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
      label: "Active",
    },

    ended: {
      wrapper: "bg-slate-100 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
      label: "Ended",
    },

    uploaded: {
      wrapper: "bg-blue-50 text-blue-700 border-blue-200",
      dot: "bg-blue-500",
      label: "Uploaded",
    },
  };

  const style: any = styles[status];

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        px-3
        py-1.5
        text-xs
        font-bold
        ${style.wrapper}
      `}
    >
      <span
        className={`
          h-2
          w-2
          rounded-full
          ${style.dot}
          ${status === "active" ? "animate-pulse" : ""}
        `}
      />

      {style.label}
    </span>
  );
}
