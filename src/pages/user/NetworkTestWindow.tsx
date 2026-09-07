import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../services/socket.service";
import httpService from "../../services/http.service";
import { toastError } from "../../components/CustomToast";
import NetworkTestLoadingPage from "./NetworkTestLoading";

//import NetworkDisconnectedPage from "./NetworkDisconnected";
import { toast } from "sonner";
import type { Question, SystemInformation } from "./NetworkTestPage";
import NetworkTestPage from "./NetworkTestPage";
import NetworkDisconnectedModal from "./NetworkInterruptionDialog";

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

  const [loading, setLoading] = useState(true);

  //const onServerLogout

  const getNetworkTest = async () => {
    setLoading(true);
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
    setLoading(false);
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

  if (loading) return <NetworkTestLoadingPage />;

  return (
    <div>
      {system && (
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

      <NetworkDisconnectedModal open={!connected} />
    </div>
  );
}

export default NetworkTestWindow;
