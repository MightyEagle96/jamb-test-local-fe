import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { socket } from "../../services/socket.service";
import httpService from "../../services/http.service";
import { toastError } from "../../components/CustomToast";
function NetworkTestWindow() {
  const [params] = useSearchParams();

  const testId = params.get("id");
  const computer = params.get("computer");

  console.log(testId);
  const [connected, setConnected] = useState(false);

  const navigate = useNavigate();

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
      console.log("connected", socket.id);
    };

    const disconnect = () => {
      setConnected(false);
      console.log("disconnected", socket.id);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", disconnect);

    socket.on("end-test", (data) => {
      if (data === testId) {
        navigate("/");
      }
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", disconnect);
    };
  }, [testId]);

  return <div>NetworkTestWindow</div>;
}

export default NetworkTestWindow;
