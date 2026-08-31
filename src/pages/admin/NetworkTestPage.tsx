import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  Clock3,
  Monitor,
  Play,
  Square,
  Upload,
  WifiOff,
  Loader2,
} from "lucide-react";
import httpService from "../../services/http.service";
import { useAppUser } from "../../contexts/AppUserContext";
import Swal from "sweetalert2";
import { toastError } from "../../components/CustomToast";
import { toast } from "sonner";
import NetworkTestResponsesTable from "./NetworkTestResponseTable";
import NetworkTestUploadDialog from "../../components/UploadDialog";

type NetworkTestStatus = "pending" | "active" | "ended" | "uploaded";

interface NetworkTestResponse {
  _id: string;
  createdAt: string;
  updatedAt: string;
  networkTest: string;
  computer: string;
  loggedInAt: string;
  ipAddress: string;
  responses: number;
  timeLeft: number;
  status: string;
  networkLosses: number;
}

interface NetworkTest {
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

  timeActivated?: string | null;
  timeEnded?: string | null;
  timeUploaded?: string | null;

  centre: string;

  status: NetworkTestStatus;
}

function NetworkTestPage() {
  const { id } = useParams<{ id: string }>();

  const [test, setTest] = useState<NetworkTest | null>(null);
  const [loading, setLoading] = useState(true);
  const [activating, setActivating] = useState(false);
  const [ending, setEnding] = useState(false);
  const [error, setError] = useState("");
  const [networkTestResponses, setNetworkTestResponses] = useState<
    NetworkTestResponse[]
  >([]);
  const [uploading, setUploading] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const { user } = useAppUser();
  /**
   * Fetch the network test.
   */

  const onUpload = async () => {
    setUploading(true);
    try {
      const body = {
        networkTest: test,
        networkTestResponses: networkTestResponses,
      };

      await httpService.post("/network-test/upload", body, {
        params: {
          networkTest: id,
        },
      });
      toast.success("Network test uploaded.");

      setUploadDialogOpen(false);
      fetchNetworkTest();
    } catch (error) {
      toastError(error);
    }
    setUploading(false);
  };

  const getAllData = async () => {
    setLoading(true);
    await Promise.all([fetchNetworkTest(), loadResponses()]);
    setLoading(false);
  };
  const loadResponses = async () => {
    try {
      const response = await httpService.get(
        "/network-test-responses/findall",
        {
          params: {
            networkTest: id,
          },
        },
      );

      setNetworkTestResponses(response.data.data);
    } catch (error) {
      toastError(error);
    }
  };
  const fetchNetworkTest = async () => {
    try {
      setError("");

      const response = await httpService.get(`/network-test/view/${id}`);

      setTest(response.data);
    } catch (error: any) {
      console.error(
        "Failed to fetch network test:",
        error.response?.data || error.message,
      );

      setError(
        error.response?.data?.message || "Unable to load this network test.",
      );
    }
  };

  const calculateResponseThroughput = async () => {
    await httpService.get("/network-test/calculate_response_throughput", {
      params: { networkTest: id },
    });
  };

  const calculateNetworkLosses = async () => {
    await httpService.get("/network-test/calculate_network_losses", {
      params: { networkTest: id },
    });
  };
  useEffect(() => {
    if (!id) {
      setError("Network test ID is missing.");
      setLoading(false);
      return;
    }

    calculateResponseThroughput();
    getAllData();

    if (test?.ended) {
      return;
    }

    const interval = setInterval(() => {
      loadResponses();
      fetchNetworkTest();
      calculateNetworkLosses();
      calculateResponseThroughput();
    }, 30_000);

    return () => clearInterval(interval);

    // fetchNetworkTest();
  }, [id, test?.ended]);

  const endTest = async () => {
    const result = await Swal.fire({
      title: "End network test?",
      text: "This will end the test and calculate the final response metrics. This action cannot be undone.",
      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, end test",
      cancelButtonText: "Continue testing",

      reverseButtons: true,

      buttonsStyling: false,

      customClass: {
        popup: "rounded-3xl",
        title: "text-xl font-bold text-slate-800",
        htmlContainer: "text-sm text-slate-500",

        confirmButton: `
      rounded-xl
      bg-rose-50
      px-5
      py-3
      text-sm
      font-bold
      text-rose-700
      border
      border-rose-200
      transition-all
      hover:bg-rose-100
      ms-3
    `,

        cancelButton: `
      rounded-xl
      bg-emerald-700
      px-5
      py-3
      text-sm
      font-bold
      text-white
      transition-all
      hover:bg-emerald-800
    `,
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setEnding(true);

      await httpService.patch(`/network-test/end/${id}`);

      toast.success("Network test ended successfully.");

      await fetchNetworkTest();
    } catch (error) {
      toastError(error);
    } finally {
      setEnding(false);
    }
  };

  /**
   * Activate a pending network test.
   */
  const activateTest = async () => {
    if (!test || test.status !== "pending") {
      return;
    }

    const result = await Swal.fire({
      title: "Activate Network Test?",
      html: `
      <div class="text-left">
        <p class="text-slate-600">
          You are about to activate this network test.
        </p>

        <div class="mt-4 rounded-xl bg-emerald-50 p-4">
          <p class="text-sm font-semibold text-emerald-800">
            What happens next?
          </p>

          <p class="mt-1 text-sm leading-6 text-emerald-700">
            The test will move from <strong>Pending</strong> to
            <strong>Active</strong>, and participating computers
            will be able to connect to the test.
          </p>
        </div>

        <p class="mt-4 text-sm text-slate-500">
          Are you sure you want to continue?
        </p>
      </div>
    `,
      icon: "question",

      showCancelButton: true,

      confirmButtonText: "Yes, Activate Test",
      cancelButtonText: "Cancel",

      reverseButtons: true,

      buttonsStyling: false,

      customClass: {
        popup: "rounded-3xl",
        title: "text-xl font-bold text-slate-800",
        htmlContainer: "text-sm",
        confirmButton:
          "ml-2 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 focus:outline-none",
        cancelButton:
          "rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-200 focus:outline-none",
      },
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      setActivating(true);

      await httpService.patch(`/network-test/activate/${test._id}`);

      toast.success("Network test activated.");

      loadResponses();

      fetchNetworkTest();
    } catch (error: any) {
      toastError(error);
    } finally {
      setActivating(false);
    }
  };
  /*
   * Loading state
   */
  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-4 w-28 rounded bg-slate-200" />

          <div className="mt-6 h-8 w-72 rounded-lg bg-slate-200" />

          <div className="mt-3 h-4 w-96 max-w-full rounded bg-slate-200" />

          <div className="mt-8 h-64 rounded-3xl bg-slate-200" />

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="h-28 rounded-2xl bg-slate-200" />
            <div className="h-28 rounded-2xl bg-slate-200" />
            <div className="h-28 rounded-2xl bg-slate-200" />
            <div className="h-28 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </main>
    );
  }

  /*
   * Error / not found
   */
  if (error || !test) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-600">
            <WifiOff size={22} />
          </div>

          <h2 className="mt-4 text-lg font-bold text-red-800">
            Unable to load network test
          </h2>

          <p className="mt-2 text-sm text-red-600">
            {error || "The requested network test could not be found."}
          </p>

          <Link
            to="/network-tests"
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-emerald-700
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-emerald-800
            "
          >
            <ArrowLeft size={17} />
            Back to Network Tests
          </Link>
        </div>
      </main>
    );
  }

  const statusStyles: Record<
    NetworkTestStatus,
    {
      wrapper: string;
      dot: string;
      text: string;
    }
  > = {
    pending: {
      wrapper: "bg-amber-50 border-amber-200",
      dot: "bg-amber-500",
      text: "text-amber-700",
    },

    active: {
      wrapper: "bg-emerald-50 border-emerald-200",
      dot: "bg-emerald-500",
      text: "text-emerald-700",
    },

    ended: {
      wrapper: "bg-slate-100 border-slate-200",
      dot: "bg-slate-500",
      text: "text-slate-700",
    },

    uploaded: {
      wrapper: "bg-blue-50 border-blue-200",
      dot: "bg-blue-500",
      text: "text-blue-700",
    },
  };

  const currentStatus = statusStyles[test.status];

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* =========================================================
    HEADER
========================================================= */}

      <Link
        to="/network-tests"
        className="
    inline-flex
    items-center
    gap-2
    text-sm
    font-semibold
    text-slate-500
    transition
    hover:text-emerald-700
  "
      >
        <ArrowLeft size={17} />
        Network Tests
      </Link>

      {/* =========================================================
    HERO
========================================================= */}

      <section className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-green-600 p-6 text-white sm:p-8">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            {/* Test identity */}
            <div>
              <div className="flex items-start gap-4">
                <div
                  className="
              flex
              h-14
              w-14
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-white/15
            "
                >
                  <Activity size={28} />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-2xl font-bold tracking-tight">
                      Network Connectivity Test
                    </h1>

                    {/* Status */}
                    <div
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
                  capitalize
                  ${currentStatus.wrapper}
                  ${currentStatus.text}
                `}
                    >
                      <span
                        className={`
                    h-2
                    w-2
                    rounded-full
                    ${currentStatus.dot}
                    ${test.status === "active" ? "animate-pulse" : ""}
                  `}
                      />

                      {test.status}
                    </div>
                  </div>

                  <p className="mt-2 font-mono text-xs text-emerald-100/80">
                    {test.examId}
                  </p>
                </div>
              </div>

              <p className="mt-5 max-w-2xl text-sm leading-6 text-emerald-50">
                Monitor the connectivity and response behaviour of computers
                participating in this network test.
              </p>
            </div>

            {/* Lifecycle action */}
            <div className="shrink-0">
              {test.status === "pending" && (
                <button
                  type="button"
                  onClick={activateTest}
                  disabled={activating}
                  className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              bg-white
              px-6
              py-3.5
              text-sm
              font-bold
              text-emerald-700
              shadow-lg
              transition
              hover:bg-emerald-50
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
                >
                  <Play size={17} />

                  {activating ? "Activating..." : "Activate Test"}
                </button>
              )}
              {test.status === "active" && (
                <button
                  type="button"
                  onClick={endTest}
                  disabled={ending}
                  className="
      inline-flex
      items-center
      justify-center
      gap-2
      rounded-2xl
      bg-rose-100
      px-6
      py-3.5
      text-sm
      font-bold
      text-rose-700
      shadow-sm
      transition
      hover:bg-rose-200
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
                >
                  <Square size={16} />

                  {ending ? "Ending Test..." : "End Test"}
                </button>
              )}

              {(test.status === "ended" || test.status === "uploaded") && (
                <button
                  type="button"
                  onClick={() => setUploadDialogOpen(!uploadDialogOpen)}
                  disabled={uploading}
                  className="
      inline-flex
      items-center
      justify-center
      gap-2
      rounded-2xl
      bg-white
      px-5
      py-3.5
      text-sm
      font-bold
      text-emerald-700
      shadow-lg
      transition-all
      duration-200
      hover:-translate-y-0.5
      hover:bg-emerald-50
      hover:shadow-xl
      active:scale-[0.98]
      disabled:cursor-not-allowed
      disabled:opacity-60
    "
                >
                  {uploading ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload size={17} />
                      Upload Test Results
                    </>
                  )}
                </button>
              )}

              {/* {test.status === "uploaded" && (
                <div
                  className="
              inline-flex
              items-center
              gap-2
              rounded-2xl
              bg-white/15
              px-5
              py-3.5
              text-sm
              font-semibold
            "
                >
                  <Upload size={17} />
                  Results uploaded
                </div>
              )} */}
            </div>
          </div>
        </div>

        {/* Primary Metrics */}
        <div
          className="
      grid
      grid-cols-1
      divide-y
      divide-slate-100
      sm:grid-cols-3
      sm:divide-x
      sm:divide-y-0
    "
        >
          <Metric
            icon={<Monitor size={20} />}
            label="Systems Connected"
            value={`${networkTestResponses.length.toLocaleString()}/${user?.centreCapacity}`}
          />

          <Metric
            icon={<Clock3 size={20} />}
            label="Test Duration"
            value={`${test.duration} minutes`}
          />

          <Metric
            icon={<Activity size={20} />}
            label="Response Throughput"
            value={parseInt(test.responseThroughput).toFixed(2)}
          />
        </div>
      </section>

      {/* =========================================================
          NETWORK PERFORMANCE
      ========================================================== */}

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800">
            Network Performance
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Connectivity statistics recorded during the test.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Network Losses"
            value={test.totalNetworkLosses.toLocaleString()}
          />

          <StatCard
            label="Affected Computers"
            value={test.computersWithNetworkLosses.toLocaleString()}
          />

          {/* <StatCard
            label="Lost in Transport"
            value={test.lostInTransport.toLocaleString()}
          /> */}

          <StatCard
            label="Ended Computers"
            value={test.endedComputers.toLocaleString()}
          />
        </div>
      </section>

      {/* =========================================================
          TIMELINE
      ========================================================== */}

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-800">Test Timeline</h2>

          <p className="mt-1 text-sm text-slate-500">
            Important events throughout the test lifecycle.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between">
            {/* Created */}
            <div className="flex flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                <div className="h-3 w-3 shrink-0 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />

                <div className="h-0.5 flex-1 bg-emerald-200" />
              </div>

              <div className="mt-4">
                <p className="text-sm font-semibold text-slate-700">
                  Test Created
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {test.dateCreated
                    ? new Date(test.dateCreated).toLocaleString()
                    : "—"}
                </p>
              </div>
            </div>

            {/* Activated */}
            <div className="flex flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                <div className="h-0.5 flex-1 bg-emerald-200" />

                <div
                  className={`h-3 w-3 shrink-0 rounded-full ring-4 ${
                    test.timeActivated
                      ? "bg-emerald-500 ring-emerald-50"
                      : "bg-slate-200 ring-slate-50"
                  }`}
                />

                <div
                  className={`h-0.5 flex-1 ${
                    test.timeActivated ? "bg-emerald-200" : "bg-slate-100"
                  }`}
                />
              </div>

              <div className="mt-4">
                <p
                  className={`text-sm font-semibold ${
                    test.timeActivated ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  Test Activated
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {test.timeActivated
                    ? new Date(test.timeActivated).toLocaleString()
                    : "Pending"}
                </p>
              </div>
            </div>

            {/* Ended */}
            <div className="flex flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                <div
                  className={`h-0.5 flex-1 ${
                    test.timeEnded ? "bg-emerald-200" : "bg-slate-100"
                  }`}
                />

                <div
                  className={`h-3 w-3 shrink-0 rounded-full ring-4 ${
                    test.timeEnded
                      ? "bg-emerald-500 ring-emerald-50"
                      : "bg-slate-200 ring-slate-50"
                  }`}
                />

                <div
                  className={`h-0.5 flex-1 ${
                    test.timeEnded ? "bg-emerald-200" : "bg-slate-100"
                  }`}
                />
              </div>

              <div className="mt-4">
                <p
                  className={`text-sm font-semibold ${
                    test.timeEnded ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  Test Ended
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {test.timeEnded
                    ? new Date(test.timeEnded).toLocaleString()
                    : "Pending"}
                </p>
              </div>
            </div>

            {/* Uploaded */}
            <div className="flex flex-1 flex-col items-center text-center">
              <div className="flex w-full items-center">
                <div
                  className={`h-0.5 flex-1 ${
                    test.timeUploaded ? "bg-emerald-200" : "bg-slate-100"
                  }`}
                />

                <div
                  className={`h-3 w-3 shrink-0 rounded-full ring-4 ${
                    test.timeUploaded
                      ? "bg-emerald-500 ring-emerald-50"
                      : "bg-slate-200 ring-slate-50"
                  }`}
                />
              </div>

              <div className="mt-4">
                <p
                  className={`text-sm font-semibold ${
                    test.timeUploaded ? "text-slate-700" : "text-slate-400"
                  }`}
                >
                  Results Uploaded
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {test.timeUploaded
                    ? new Date(test.timeUploaded).toLocaleString()
                    : "Pending"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5">
          <NetworkTestResponsesTable responses={networkTestResponses} />
        </div>
      </section>
      <NetworkTestUploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onUpload={onUpload}
        computersParticipated={networkTestResponses.length}
        centreCapacity={user?.centreCapacity ?? 0}
        responseThroughput={test.responseThroughput}
        duration={test.duration}
        computersWithNetworkLosses={test.computersWithNetworkLosses}
        totalNetworkLosses={test.totalNetworkLosses}
        uploading={uploading}
      />
    </main>
  );
}

/* =============================================================
   PRIMARY METRIC
============================================================= */

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="p-6 sm:p-7">
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-emerald-50
            text-emerald-700
          "
        >
          {icon}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {label}
          </p>

          <p className="mt-1 text-xl font-bold text-slate-800">{value}</p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   PERFORMANCE CARD
============================================================= */

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        transition
        hover:shadow-md
      "
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}

/* =============================================================
   TIMELINE
============================================================= */

// function TimelineItem({
//   label,
//   date,
//   active = false,
// }: {
//   label: string;
//   date: string;
//   active?: boolean;
// }) {
//   return (
//     <div className="flex items-center gap-4 py-4">
//       <div className="relative flex flex-col items-center">
//         <div
//           className={`
//             flex
//             h-10
//             w-10
//             items-center
//             justify-center
//             rounded-full
//             ${
//               active
//                 ? "bg-emerald-100 text-emerald-700"
//                 : "bg-slate-100 text-slate-400"
//             }
//           `}
//         >
//           <CheckCircle2 size={19} />
//         </div>
//       </div>

//       <div className="flex-1">
//         <p className="text-sm font-semibold text-slate-700">{label}</p>

//         <p className="mt-1 text-xs text-slate-400">
//           {new Date(date).toLocaleString()}
//         </p>
//       </div>
//     </div>
//   );
// }

export default NetworkTestPage;
