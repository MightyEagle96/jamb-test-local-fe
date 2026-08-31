import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Eye,
  Monitor,
  Network,
  WifiOff,
} from "lucide-react";

import httpService from "../../services/http.service";
import { toastError } from "../../components/CustomToast";
import ViewResponsesButton from "./ViewResponsesButton";

interface NetworkTest {
  _id: string;
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

  responseThroughput: number;

  timeActivated?: string | null;

  timeEnded?: string | null;

  timeUploaded?: string | null;

  centre: string;

  status: string;

  createdAt: string;

  updatedAt: string;
}

function UploadedNetworkTests() {
  const [tests, setTests] = useState<NetworkTest[]>([]);

  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      setLoading(true);

      const { data } = await httpService.get(
        "/network-test/view_uploaded_tests",
      );

      /*
       * Adjust this depending on your API response.
       *
       * Expected possibilities:
       *
       * data = [...]
       *
       * OR
       *
       * data = {
       *   success: true,
       *   data: [...]
       * }
       */

      setTests(Array.isArray(data) ? data : data.data || []);
    } catch (e) {
      toastError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (date?: string | null) => {
    if (!date) return "—";

    return new Date(date).toLocaleString([], {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatThroughput = (throughput?: number) => {
    if (typeof throughput !== "number") {
      return "0.00%";
    }

    return `${throughput.toFixed(2)}%`;
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-emerald-100
              text-emerald-700
            "
          >
            <CheckCircle2 size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-black text-slate-800 sm:text-3xl">
              Uploaded Network Tests
            </h1>

            <p className="mt-1 text-sm text-slate-500 sm:text-base">
              View and monitor network tests uploaded from this centre.
            </p>
          </div>
        </div>

        <Link
          to="/network-tests"
          className="
            inline-flex
            items-center
            gap-2
            self-start
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-semibold
            text-slate-600
            shadow-sm
            transition
            hover:bg-slate-50
            sm:self-auto
          "
        >
          <ArrowLeft size={16} />
          Back to Tests
        </Link>
      </div>

      {/* =====================================================
          TABLE
      ===================================================== */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Table Header */}

        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-base font-bold text-slate-800">
              Uploaded Tests
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {tests.length} uploaded network test
              {tests.length === 1 ? "" : "s"}
            </p>
          </div>

          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-emerald-50
              px-3
              py-1.5
              text-xs
              font-semibold
              text-emerald-700
            "
          >
            <CheckCircle2 size={14} />
            Uploaded
          </div>
        </div>

        {/* Loading */}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-600" />

            <p className="mt-4 text-sm font-medium text-slate-500">
              Loading uploaded network tests...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px] text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Test
                  </th>

                  <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Duration
                  </th>

                  <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Computers
                  </th>

                  <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Throughput
                  </th>

                  <th className="px-5 py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Network Losses
                  </th>

                  <th className="px-5 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Uploaded At
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {/* Empty State */}

                {tests.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-20 text-center">
                      <div
                        className="
                          mx-auto
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center
                          rounded-2xl
                          bg-slate-100
                          text-slate-400
                        "
                      >
                        <Network size={26} />
                      </div>

                      <p className="mt-4 text-sm font-semibold text-slate-600">
                        No uploaded network tests
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Uploaded network tests will appear here.
                      </p>
                    </td>
                  </tr>
                ) : (
                  tests.map((test, index) => (
                    <tr
                      key={test._id}
                      className="transition hover:bg-slate-50/70"
                    >
                      {/* Test */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="
                              flex
                              h-9
                              w-9
                              shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-violet-50
                              text-violet-600
                            "
                          >
                            <Activity size={17} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-700">
                              Network Test {index + 1}
                            </p>

                            <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                              {test._id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Duration */}

                      <td className="px-5 py-4 text-center">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                          <Clock3 size={15} className="text-slate-400" />
                          {test.duration} min
                        </div>
                      </td>

                      {/* Connected Computers */}

                      <td className="px-5 py-4 text-center">
                        <div
                          className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-slate-100
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            text-slate-700
                          "
                        >
                          <Monitor size={14} />

                          {test.connectedComputers}
                        </div>
                      </td>

                      {/* Response Throughput */}

                      <td className="px-5 py-4 text-center">
                        <span
                          className={`
                            inline-flex
                            rounded-lg
                            px-3
                            py-1.5
                            text-xs
                            font-bold
                            ${
                              test.responseThroughput >= 95
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-red-50 text-red-600"
                            }
                          `}
                        >
                          {formatThroughput(test.responseThroughput)}
                        </span>
                      </td>

                      {/* Network Losses */}

                      <td className="px-5 py-4 text-center">
                        <div className="inline-flex items-center gap-2">
                          <WifiOff
                            size={15}
                            className={
                              test.totalNetworkLosses > 0
                                ? "text-red-500"
                                : "text-emerald-500"
                            }
                          />

                          <span
                            className={`
                              text-sm
                              font-bold
                              ${
                                test.totalNetworkLosses > 0
                                  ? "text-red-600"
                                  : "text-emerald-600"
                              }
                            `}
                          >
                            {test.totalNetworkLosses}
                          </span>
                        </div>
                      </td>

                      {/* Uploaded At */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Clock3
                            size={14}
                            className="shrink-0 text-slate-400"
                          />

                          <span className="text-xs font-medium text-slate-600">
                            {formatDate(test.createdAt)}
                          </span>
                        </div>
                      </td>

                      {/* View Responses */}

                      <td className="px-5 py-4">
                        <div className="flex justify-end">
                          <ViewResponsesButton networkTest={test._id} />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadedNetworkTests;
