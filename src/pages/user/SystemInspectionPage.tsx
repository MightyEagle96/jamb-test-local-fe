import { useEffect, useState } from "react";
import { toast } from "sonner";

import InspectionSidebar from "../../components/InspectionSideBar";
import InspectionCards from "../../components/InspectionCards";
import FailurePanel from "../../components/FailurePanel";

import { getSystemInformation } from "../../services/system.service";
import type { SystemInformation } from "../../types/system";
import InspectionCardsLoading from "../../components/InspectionCardsLoading";
import Swal from "sweetalert2";
import httpService from "../../services/http.service";
import { toastError } from "../../components/CustomToast";
import { useNavigate } from "react-router-dom";
import { socket } from "../../services/socket.service";

export default function SystemInspectionPage() {
  const [loading, setLoading] = useState(true);

  const [system, setSystem] = useState<SystemInformation["data"] | null>(null);

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const loadSystem = async () => {
    try {
      setLoading(true);
      setError(false);

      const response = await getSystemInformation();

      setSystem(response.data);

      toast.success("System inspection completed.");
    } catch (err) {
      console.error(err);

      setError(true);

      toast.error("Unable to communicate with the JAMB Test Agent.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSystem();
  }, []);

  const onRegister = async () => {
    Swal.fire({
      title: "Register Computer?",
      html: `
      <div style="text-align:left; line-height:1.7; font-size:15px;">
        <p style="margin-bottom:16px;">
          You are about to register this computer for use at your
          <strong>JAMB accredited CBT Centre</strong>.
        </p>

        <div style="
          background:#F8FAFC;
          border:1px solid #E2E8F0;
          border-radius:12px;
          padding:16px;
          margin-bottom:16px;
        ">
          <p style="margin:0 0 10px 0;">
            Please confirm that:
          </p>

          <ul style="margin:0; padding-left:18px;">
            <li>
              This computer has <strong>never been registered</strong>
              under another CBT Centre.
            </li>

            <li>
              This computer belongs to your current accredited CBT Centre
              and is being registered for official examination purposes.
            </li>
          </ul>
        </div>

        <div style="
          background:#FEF2F2;
          border:1px solid #FECACA;
          border-radius:12px;
          padding:16px;
        ">
          <strong style="color:#B91C1C;">Important Notice</strong>

          <p style="margin-top:10px;">
            Any attempt to register a computer that has been assigned to
            another CBT Centre may constitute a breach of JAMB regulations.
            Such systems may be flagged for investigation, and the
            responsible centre may be subject to applicable administrative
            or legal actions.
          </p>
        </div>
      </div>
    `,
      icon: "warning",

      width: 700,

      showCancelButton: true,

      confirmButtonText: "Yes, Register Computer",

      cancelButtonText: "Cancel",

      reverseButtons: true,

      focusCancel: true,

      allowOutsideClick: false,

      allowEscapeKey: false,

      // customClass: {
      //   popup: "rounded-3xl",
      //   title: "text-2xl font-bold text-slate-800",
      //   confirmButton:
      //     "bg-gradient-to-r from-emerald-700 to-green-600 text-white px-6 py-3 rounded-xl font-semibold",
      //   cancelButton:
      //     "bg-slate-200 text-slate-700 px-6 py-3 rounded-xl font-semibold",
      // },

      customClass: {
        popup: "rounded-3xl",

        title: "text-2xl font-bold text-slate-800",

        htmlContainer: "text-slate-700",

        actions: "mt-6 flex gap-3",

        confirmButton: `
    min-w-[180px]
    rounded-xl
    bg-gradient-to-r
    from-emerald-700
    via-green-600
    to-lime-600
    px-5
    py-2.5
    text-sm
    font-semibold
    text-white
    shadow-lg
    shadow-green-900/20
    transition-all
    duration-300
    hover:-translate-y-0.5
    hover:shadow-xl
    hover:shadow-green-900/30
    active:scale-[0.98]
  `,

        cancelButton: `
    min-w-[120px]
    rounded-xl
    border
    border-slate-300
    bg-white
    px-5
    py-2.5
    text-sm
    font-semibold
    text-slate-700
    transition-all
    duration-300
    hover:bg-slate-100
    hover:border-slate-400
    active:scale-[0.98]
  `,
      },

      buttonsStyling: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await httpService.post(
            "/computers/register",
            system,
          );
          toast.success(data.message);
        } catch (err) {
          console.error(err);

          toastError(err);
        }
      }
    });

    // if (!result.isConfirmed) return;

    // await httpService;

    // TODO:
    // Call the registration endpoint here.
  };

  const isQualifiedToTakeTest = async (testData: any) => {
    try {
      const { data } = await httpService.get("/computers/one", {
        params: {
          serialNumber: system?.identity.serialNumber,
          macAddress: system?.network.macAddress,
          networkTest: testData._id,
        },
      });

      if (data.status === true) {
        navigate(`/network-test?id=${testData._id}&computer=${data.computer}`);
      } else {
        navigate("/network-test-blocked");
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    const onConnect = () => {
      console.log("connected", socket.id);
    };

    const disconnect = () => {
      console.log("disconnected", socket.id);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", disconnect);

    socket.on("test-status", (data) => {
      if (!system) return;
      isQualifiedToTakeTest(data);
    });
    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", disconnect);
    };
  }, [system]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-emerald-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center p-6">
        <div className="grid w-full overflow-hidden rounded-[40px] bg-white shadow-[0_35px_90px_rgba(0,0,0,.15)] lg:grid-cols-[40%_60%]">
          {/* LEFT */}

          <InspectionSidebar loading={loading} ready={!!system} />

          {/* RIGHT */}

          <div className="flex items-center justify-center p-8 md:p-10 lg:p-12">
            {loading && <InspectionCardsLoading />}

            {!loading && error && <FailurePanel onRetry={loadSystem} />}

            {!loading && system && (
              <InspectionCards system={system} onRegister={onRegister} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
