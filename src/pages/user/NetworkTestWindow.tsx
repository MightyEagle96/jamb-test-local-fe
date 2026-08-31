import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState, useRef } from "react";
import { socket } from "../../services/socket.service";
import httpService from "../../services/http.service";
import { toastError } from "../../components/CustomToast";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import {
  Clock3,
  Cpu,
  Database,
  HardDrive,
  Monitor,
  Network,
  Server,
  ShieldCheck,
} from "lucide-react";
import QuestionDisplay from "./QuestionDisplay";
import NetworkDisconnectedPage from "./NetworkDisconnected";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  answer: string;
  options: string[];
}

interface SystemInformation {
  _id: string;
  createdAt: string;
  updatedAt: string;

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

interface NetworkTestPageProps {
  system: SystemInformation;
  initialTimeLeft?: number;
  connectedStatus: boolean;
  ipAddress: string;
  question: Question;
  responses: number;
  saveResponse: (timeLeft: number) => void;
  endTest: () => void;
}

function NetworkTestPage({
  system,
  initialTimeLeft = 60 * 60 * 1000,
  connectedStatus,
  ipAddress,
  question,
  responses,
  saveResponse,
  endTest,
}: NetworkTestPageProps) {
  const [childTimeLeft, setChildTimeLeft] = useState(0);

  const [responseCount, setResponseCount] = useState(responses);

  const [lastResponseAt, setLastResponseAt] = useState<Date | null>(null);

  const childTimeLeftRef = useRef(childTimeLeft);

  /*
   * ---------------------------------------------------------
   * Countdown
   * ---------------------------------------------------------
   */

  useEffect(() => {
    setChildTimeLeft(initialTimeLeft);
  }, [initialTimeLeft]);

  useEffect(() => {
    childTimeLeftRef.current = childTimeLeft;
  }, [childTimeLeft]);

  /*
   * ---------------------------------------------------------
   * Timer formatting
   * ---------------------------------------------------------
   */

  const formattedTime = useMemo(() => {
    const totalSeconds = Math.floor(childTimeLeft / 1000);

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }, [childTimeLeft]);

  /*
   * ---------------------------------------------------------
   * System information
   * ---------------------------------------------------------
   */

  const systemInformation = [
    {
      label: "Operating System",
      value: system.operatingSystem.name,
      icon: Monitor,
    },
    {
      label: "OS Version",
      value: system.operatingSystem.version,
      icon: Monitor,
    },
    {
      label: "Architecture",
      value: system.operatingSystem.architecture,
      icon: Server,
    },
    {
      label: "Processor",
      value: system.processor.model,
      icon: Cpu,
    },
    {
      label: "CPU Cores",
      value: system.processor.cores,
      icon: Cpu,
    },
    {
      label: "Memory",
      value: `${Math.ceil(system.memory.totalBytes / 1024 ** 3).toFixed(2)} GB`,
      icon: Database,
    },
    {
      label: "Hostname",
      value: system.network.hostname,
      icon: HardDrive,
    },
    {
      label: "MAC Address",
      value: system.network.macAddress,
      icon: Network,
    },
    {
      label: "IP Address",
      value: ipAddress,
      icon: Network,
    },
    {
      label: "Serial Number",
      value: system.identity.serialNumber,
      icon: ShieldCheck,
    },
  ];

  useEffect(() => {
    if (!connectedStatus) {
      return;
    }

    const interval = window.setInterval(() => {
      const currentTimeLeft = childTimeLeftRef.current;

      saveResponse(currentTimeLeft);
      setResponseCount((prev) => prev + 1);

      setLastResponseAt(new Date());

      //  if (currentTimeLeft <= 0) {
      //    endTest();
      //  }
    }, 60_000);

    return () => {
      window.clearInterval(interval);
    };
  }, [connectedStatus]);
  return (
    <div className="h-screen overflow-hidden bg-slate-100 text-slate-800">
      <div className="flex h-full flex-col">
        {/* =====================================================
            HEADER
        ====================================================== */}

        <header className="shrink-0 border-b border-slate-200 bg-white">
          <div className="flex h-16 items-center justify-between px-6">
            {/* Left */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Network size={19} />
                </div>

                <div>
                  <h1 className="text-sm font-bold text-slate-800">
                    JAMB Test Network Assessment
                  </h1>

                  <p className="text-[11px] text-slate-400">
                    Network Performance Evaluation
                  </p>
                </div>
              </div>
            </div>

            {/* Right status */}
            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-[11px] font-semibold text-emerald-700">
                  TEST ACTIVE
                </span>
              </div>

              <div className="text-right">
                <p className="text-[10px] uppercase tracking-wider text-slate-400">
                  Response
                </p>

                <p className="text-xs font-bold text-slate-700">
                  #{responseCount.toString().padStart(2, "0")}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* =====================================================
            MAIN
        ====================================================== */}

        <main className="min-h-0 flex-1 p-5">
          <div className="flex h-full min-h-0 gap-5">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}

            <section className="flex min-w-0 flex-1 flex-col">
              {/* Timer */}
              <div className="mb-5 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      Time Remaining
                    </p>

                    <div className="mt-1 flex items-center gap-3">
                      <Clock3 size={20} className="text-emerald-600" />

                      <span className="font-mono text-3xl font-bold tracking-tight text-slate-800">
                        {formattedTime}
                      </span>
                    </div>

                    <div className="hidden">
                      <CountdownCircleTimer
                        isPlaying={connectedStatus || initialTimeLeft > 0}
                        duration={initialTimeLeft / 1000}
                        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
                        colorsTime={[7, 5, 2, 0]}
                        onComplete={() => {
                          // Test has ended
                          endTest();
                        }}
                        onUpdate={(e) => {
                          setChildTimeLeft(e * 1000);
                        }}
                      >
                        {({ remainingTime }) => {
                          return remainingTime;
                        }}
                      </CountdownCircleTimer>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] uppercase tracking-wider text-slate-400">
                      Responses Recorded
                    </p>

                    <p className="mt-1 text-lg font-bold text-slate-700">
                      {responseCount}
                    </p>
                  </div>
                </div>
              </div>

              {/* Question area */}
              <div className="flex min-h-0 flex-1 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Question header */}
                <div className="border-b border-slate-100 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                        Network Test Response
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Response received from the central test server
                      </p>
                    </div>

                    {lastResponseAt && (
                      <div className="text-right">
                        <p className="text-[10px] text-slate-400">
                          Last response
                        </p>

                        <p className="text-[11px] font-semibold text-slate-600">
                          {lastResponseAt.toLocaleTimeString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Question */}
                {/* Question */}
                <div className="flex min-h-0 flex-1 flex-col overflow-auto p-7">
                  {question ? (
                    <QuestionDisplay question={question} />
                  ) : (
                    <div className="flex flex-1 items-center justify-center">
                      <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                          <Network size={22} />
                        </div>

                        <p className="mt-4 text-sm font-semibold text-slate-600">
                          Waiting for network test response
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          The first response will be received from the central
                          test server.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom status */}
                <div className="border-t border-slate-100 bg-slate-50 px-6 py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-[10px] text-slate-400">
                      Responses are automatically transmitted to the central
                      JAMB Test database.
                    </p>

                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                      <span className="text-[10px] font-semibold text-emerald-600">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* =================================================
                RIGHT SYSTEM INFORMATION
            ================================================== */}

            <aside className="hidden w-[300px] shrink-0 flex-col rounded-2xl border border-slate-200 bg-white shadow-sm lg:flex">
              {/* Header */}
              <div className="border-b border-slate-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Monitor size={18} />
                  </div>

                  <div>
                    <h2 className="text-xs font-bold text-slate-700">
                      System Information
                    </h2>

                    <p className="text-[10px] text-slate-400">
                      Registered test workstation
                    </p>
                  </div>
                </div>
              </div>

              {/* Information */}
              <div className="min-h-0 flex-1 overflow-y-auto p-4">
                <div className="grid grid-cols-1 gap-1">
                  {systemInformation.map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className="group rounded-xl px-3 py-2.5 transition hover:bg-slate-50"
                      >
                        <div className="flex items-start gap-3">
                          <Icon
                            size={14}
                            className="mt-0.5 shrink-0 text-slate-300"
                          />

                          <div className="min-w-0">
                            <p className="text-[9px] font-medium uppercase tracking-wider text-slate-400">
                              {item.label}
                            </p>

                            <p className="mt-0.5 break-words text-[11px] font-bold leading-4 text-slate-700">
                              {item.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 px-5 py-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Workstation ID
                  </span>

                  <span className="max-w-[150px] truncate font-mono text-[9px] font-semibold text-slate-500">
                    {system._id}
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}

function NetworkTestWindow() {
  const [params] = useSearchParams();

  const testId = params.get("id");
  const computer = params.get("computer");

  const [system, setSystem] = useState<SystemInformation | null>(null);
  const [connected, setConnected] = useState(socket.connected);
  const [ipAddress, setIpAddress] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [question, setQuestion] = useState<Question | null>(null);
  const [responses, setResponses] = useState(0);
  const navigate = useNavigate();

  //const onServerLogout

  const getNetworkTest = async () => {
    try {
      const { data } = await httpService.get(
        "/network-test-responses/findone",
        {
          params: {
            networkTest: testId,
            computer,
          },
        },
      );

      console.log(data);

      setResponses(data.data.responses);

      setTimeLeft(data.data.timeLeft);
      setSystem(data.data.computerDetails);
      setQuestion(data.question);

      setIpAddress(data.data.ipAddress);
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    getNetworkTest();
  }, []);

  useEffect(() => {
    const onConnect = () => {
      setConnected(true);
    };

    const onDisconnect = () => {
      setConnected(false);
    };

    const onReconnect = () => {
      setConnected(true);
    };

    const onEndTest = (data: string) => {
      if (data === testId) {
        navigate("/");
      }
    };

    const endTestAdminEvent = () => {
      navigate(`/concluded?test=${testId}&computer=${computer}`);
    };

    const handleJoined = (data: unknown) => {
      console.log("Joined network test:", data);
    };
    socket.on("network-test-joined", handleJoined);
    socket.emit("join-network-test", { networkTest: testId, computer });

    const handleError = (error: unknown) => {
      console.error("Network test socket error:", error);
    };

    //socket.on("network-test-joined", handleJoined);
    socket.on("network-test-error", handleError);
    socket.on("end-test-admin", endTestAdminEvent);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("reconnect", onReconnect);
    socket.on("end-test", onEndTest);

    // ⭐ IMPORTANT
    // The socket may already have connected before this component mounted.
    if (socket.connected) {
      console.log("🟢 SOCKET WAS ALREADY CONNECTED");

      setConnected(true);
    }

    return () => {
      console.log("🧹 NetworkTestPage socket effect unmounted");

      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("end-test", onEndTest);
      socket.off("reconnect", onReconnect);

      socket.off("network-test-joined", handleJoined);
      socket.off("network-test-error", handleError);

      socket.off("end-test-admin", endTestAdminEvent);
    };
  }, [testId]);
  const saveResponse = async (timeRemaining: number) => {
    try {
      const { data } = await httpService.post(
        "/network-test-responses/saveresponses",
        { timeLeft: timeRemaining, computer, networkTest: testId },
      );
      setQuestion(data);
    } catch (error) {
      toast.error("Unable to save response. Please try again.");
    }
  };

  const endTest = async () => {
    try {
      const { data } = await httpService.post("/network-test-responses/end", {
        networkTest: testId,
        computer,
      });

      if (data) {
        navigate(`/concluded?test=${testId}&computer=${computer}`);
      }
    } catch (error) {
      toastError(error);
    }
  };

  if (!connected) return <NetworkDisconnectedPage />;

  return (
    <div>
      {system && connected && (
        <NetworkTestPage
          system={system as SystemInformation}
          initialTimeLeft={timeLeft}
          connectedStatus={connected}
          ipAddress={ipAddress}
          question={question as Question}
          responses={responses}
          saveResponse={saveResponse}
          endTest={endTest}
        />
      )}
    </div>
  );
}

export default NetworkTestWindow;
