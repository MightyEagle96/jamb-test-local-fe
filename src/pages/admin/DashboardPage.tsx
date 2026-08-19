import {
  Computer,
  Clock3,
  Network,
  ShieldAlert,
  CheckCircle2,
  Upload,
  Download,
  LoaderCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import httpService from "../../services/http.service";
import { socket } from "../../services/socket.service";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { toastError } from "../../components/CustomToast";

function DashboardCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="flex items-center justify-between">
        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${color}`}
        >
          {icon}
        </div>

        <CheckCircle2
          size={22}
          className="text-emerald-500 opacity-0 transition-all duration-300 group-hover:opacity-100"
        />
      </div>

      <h2 className="mt-8 text-5xl font-black tracking-tight text-slate-800">
        {value}
      </h2>

      <p className="mt-3 font-medium text-slate-500">{title}</p>
    </div>
  );
}

export default function DashboardPage() {
  // const [registeredComputers, setRegisteredComputers] = useState(0);
  // const [pendingComputers, setPendingComputers] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [infractions, setInfractions] = useState(0);
  const [dashboard, setDashboard] = useState({
    registeredComputers: 0,
    pendingComputers: 0,
    networkTests: 0,
    infractions: 0,
  });

  const getData = async () => {
    try {
      const { data } = await httpService.get("/centres/dashboard");
      setDashboard(data.data);
      console.log(data);
    } catch (e) {}
  };

  const getInfractionsCount = async () => {
    try {
      const { data } = await httpService.get("/centres/infractionsCount");

      console.log(data);
      setInfractions(data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getData();

    getInfractionsCount();

    const onConnect = async () => {
      console.log("connected", socket.id);
      getData();
    };

    const onDisconnect = () => {
      console.log("disconnected", socket.id);
    };
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("reconnect", onConnect);

    socket.on("update", (dashboard) => setDashboard(dashboard));

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("reconnect", onConnect);
    };
  }, []);

  const uploadComputers = async () => {
    Swal.fire({
      title: "Upload Centre Computers?",

      width: "720px",

      html: `
    <div style="text-align:left;line-height:1.8">
      <p>
        You are about to upload the computers currently available in your
        CBT centre to the JAMB central database.
      </p>

      <div style="
        margin-top:18px;
        padding:18px;
        border-radius:16px;
        background:#fef2f2;
        border:1px solid #fecaca;
        color:#991b1b;
      ">
        <strong>Declaration</strong>

        <p style="margin-top:10px">
          I confirm that every computer being uploaded is exclusively
          assigned to this CBT centre and has not been registered or shared
          with any other CBT centre.
        </p>

        <p style="margin-top:10px">
          I understand that registering computers belonging to another
          accredited CBT centre constitutes an examination infraction and
          may result in sanctions, withdrawal of accreditation and
          prosecution by the Joint Admissions and Matriculation Board.
        </p>
      </div>

      <p style="margin-top:18px">
        Do you wish to continue?
      </p>
    </div>
  `,

      icon: "warning",

      showCancelButton: true,

      confirmButtonText: "Yes, Upload Computers",

      cancelButtonText: "Cancel",

      reverseButtons: true,

      customClass: {
        popup: "rounded-[28px]",

        title: "text-slate-800 font-black text-3xl",

        htmlContainer: "text-slate-600 text-base",

        confirmButton:
          "rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 px-6 py-3 font-semibold text-white shadow-lg hover:shadow-xl",

        cancelButton:
          "rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100",

        actions: "gap-4 mt-8",
      },

      buttonsStyling: false,

      allowOutsideClick: false,

      allowEscapeKey: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setUploading(true);
        try {
          const { data } = await httpService.get("/computers/upload");
          toast.success(data);

          getInfractionsCount();
          //console.log(data);
        } catch (e) {
          toastError(e);
        }
        setUploading(false);
        // await httpService.post("/computers/upload");
      }
    });

    // Upload logic goes here...
  };

  const downloadComputers = async () => {
    setDownloading(true);
    try {
      const { data } = await httpService.get("/computers/download");
      toast.success(data);
      //console.log(data);
    } catch (e) {
      toastError(e);
    }
    setDownloading(false);
  };
  return (
    <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-10">
        {/* Hero */}

        <div className="rounded-[32px] bg-gradient-to-r from-emerald-900 via-green-700 to-lime-600 p-8 text-white shadow-xl lg:p-10">
          <p className="text-green-100">Welcome back</p>

          <h1 className="mt-2 text-4xl font-black lg:text-5xl">
            JAMB TEST Dashboard
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-green-100">
            Monitor registered computers, pending registrations, network
            simulations and examination infractions from one central location.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <DashboardCard
            title="Registered Computers"
            value={dashboard.registeredComputers}
            color="bg-emerald-100 text-emerald-700"
            icon={<Computer size={30} />}
          />

          <DashboardCard
            title="Pending Computers"
            value={dashboard.pendingComputers}
            color="bg-amber-100 text-amber-700"
            icon={<Clock3 size={30} />}
          />

          <DashboardCard
            title="Network Tests"
            value={dashboard.networkTests}
            color="bg-blue-100 text-blue-700"
            icon={<Network size={30} />}
          />

          <DashboardCard
            title="Infractions"
            value={infractions}
            color="bg-red-100 text-red-700"
            icon={<ShieldAlert size={30} />}
          />
        </div>

        {/* Placeholder */}
        {/* 
        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center">
          <h3 className="text-2xl font-bold text-slate-700">Activity Centre</h3>

          <p className="mt-3 text-slate-500">
            Recent registrations, simulations and infractions will appear here.
          </p>
        </div> */}
        {/* Quick Actions */}

        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Quick Actions</h2>

            <p className="mt-2 text-slate-500">
              Synchronize computers with the cloud and manage network
              simulations for your CBT centre.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Upload Computers */}

            <div className="group rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start justify-between">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                  <Upload size={30} />
                </div>

                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Recommended
                </span>
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-800">
                Upload Computers
              </h3>

              <p className="mt-4 leading-7 text-slate-500">
                Upload the computers in your facility to the cloud. Please
                ensure they are not shared with another CBT centre.
              </p>

              <button
                onClick={uploadComputers}
                disabled={uploading}
                className="
          mt-8
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
          transition-all
          duration-300
          hover:shadow-lg
        "
              >
                {uploading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload size={18} />
                    Upload Computers
                  </>
                )}
              </button>
            </div>

            {/* Download Computers */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <Download size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-800">
                Download Computers
              </h3>

              <p className="mt-4 leading-7 text-slate-500">
                Uploaded systems to the cloud before? Synchronize now to
                download the latest registered computers for this CBT centre.
              </p>

              <button
                onClick={downloadComputers}
                className="
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-2xl
          border
          border-slate-300
          bg-white
          px-6
          py-4
          font-semibold
          text-slate-700
          transition-all
          duration-300
          hover:border-emerald-600
          hover:bg-emerald-50
          hover:text-emerald-700
        "
              >
                {/* <Download size={18} />
                Download Computers */}
                {downloading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <Download size={18} />
                    Download Computers
                  </>
                )}
              </button>
            </div>

            {/* Create Network Test */}

            <div className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                <Network size={30} />
              </div>

              <h3 className="mt-8 text-2xl font-bold text-slate-800">
                Create Network Test
              </h3>

              <p className="mt-4 leading-7 text-slate-500">
                Generate a new network simulation to verify connectivity and
                readiness of all registered computers before examination day.
              </p>

              <button
                className="
          mt-8
          inline-flex
          items-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-violet-700
          to-indigo-600
          px-6
          py-4
          font-semibold
          text-white
          transition-all
          duration-300
          hover:shadow-lg
        "
              >
                <Network size={18} />
                Create Test
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
