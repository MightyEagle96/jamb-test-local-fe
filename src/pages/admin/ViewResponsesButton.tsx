import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";
import httpService from "../../services/http.service";
import { toastError } from "../../components/CustomToast";
import NetworkTestResponsesModal from "./NetworkTestResponsesModal";

interface NetworkTestResponse {
  _id: string;
  computer: string;
  networkTest: string;
  centre: string;
  createdAt: string;
  endedAt: string | null;
  ipAddress: string;
  loggedInAt: string;
  networkLosses: number;
  responses: number;
  status: string;
  timeLeft: number;
  updatedAt: string;
}

interface Props {
  networkTest: string;
}

function ViewResponsesButton({ networkTest }: Props) {
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const [responses, setResponses] = useState<NetworkTestResponse[]>([]);

  const handleViewResponses = async () => {
    try {
      setLoading(true);

      const { data } = await httpService.get(
        `/network-test/view_uploaded_test_responses?networkTest=${networkTest}`,
      );

      console.log("Network test responses:", data);

      setResponses(data);

      setOpen(true);
    } catch (error) {
      toastError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={handleViewResponses}
        disabled={loading}
        className="
          inline-flex
          items-center
          gap-2
          rounded-xl
          bg-violet-50
          px-4
          py-2
          text-xs
          font-bold
          text-violet-700
          transition
          hover:bg-violet-100
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading ? (
          <>
            <Loader2 size={15} className="animate-spin" />
            Loading...
          </>
        ) : (
          <>
            <Eye size={15} />
            View Responses
          </>
        )}
      </button>

      <NetworkTestResponsesModal
        open={open}
        onClose={() => setOpen(false)}
        responses={responses}
      />
    </>
  );
}

export default ViewResponsesButton;
