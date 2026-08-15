import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Monitor,
  Play,
  Upload,
  WifiOff,
} from "lucide-react";
import httpService from "../../services/http.service";
import { useAppUser } from "../../contexts/AppUserContext";
import Swal from "sweetalert2";
import { toastError } from "../../components/CustomToast";
import { toast } from "sonner";

type NetworkTestStatus = "pending" | "active" | "ended" | "uploaded";

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
  const [error, setError] = useState("");

  const { user } = useAppUser();
  /**
   * Fetch the network test.
   */

  const fetchNetworkTest = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await httpService.get(`/network-test/${id}`);

      setTest(response.data);
    } catch (error: any) {
      console.error(
        "Failed to fetch network test:",
        error.response?.data || error.message,
      );

      setError(
        error.response?.data?.message || "Unable to load this network test.",
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!id) {
      setError("Network test ID is missing.");
      setLoading(false);
      return;
    }

    fetchNetworkTest();
  }, [id]);

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

      await httpService.patch(`/network-test/${test._id}`);

      toast.success("Network test activated.");

      fetchNetworkTest();
    } catch (error: any) {
      console.error(
        "Failed to activate network test:",
        error.response?.data || error.message,
      );

      toastError(error);
      console.error(error);
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
                  <Activity size={17} />
                  Test is currently active
                </div>
              )}

              {test.status === "ended" && (
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
                  <CheckCircle2 size={17} />
                  Test ended
                </div>
              )}

              {test.status === "uploaded" && (
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
              )}
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
            value={`${test.connectedComputers.toLocaleString()}/${user?.centreCapacity}`}
          />

          <Metric
            icon={<Clock3 size={20} />}
            label="Test Duration"
            value={`${test.duration} minutes`}
          />

          <Metric
            icon={<Activity size={20} />}
            label="Response Throughput"
            value={test.responseThroughput}
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

          <StatCard
            label="Lost in Transport"
            value={test.lostInTransport.toLocaleString()}
          />

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
          <div className="space-y-1">
            <TimelineItem label="Test Created" date={test.dateCreated} active />

            {test.timeActivated && (
              <TimelineItem
                label="Test Activated"
                date={test.timeActivated}
                active
              />
            )}

            {test.timeEnded && (
              <TimelineItem label="Test Ended" date={test.timeEnded} active />
            )}

            {test.timeUploaded && (
              <TimelineItem
                label="Results Uploaded"
                date={test.timeUploaded}
                active
              />
            )}
          </div>
        </div>
      </section>
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

function TimelineItem({
  label,
  date,
  active = false,
}: {
  label: string;
  date: string;
  active?: boolean;
}) {
  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative flex flex-col items-center">
        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            ${
              active
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-400"
            }
          `}
        >
          <CheckCircle2 size={19} />
        </div>
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-slate-700">{label}</p>

        <p className="mt-1 text-xs text-slate-400">
          {new Date(date).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default NetworkTestPage;
