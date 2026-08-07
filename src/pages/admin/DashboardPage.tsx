import {
  Computer,
  Clock3,
  Network,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { useState, useEffect } from "react";
import httpService from "../../services/http.service";
import { socket } from "../../services/socket.service";

type DashboardProps = {
  registeredComputers: number;
  pendingComputers: number;
  networkTests: number;
  infractions: number;
};

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
  // const [networkTests, setNetworkTests] = useState(0);
  // const [infractions, setInfractions] = useState(0);
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

  useEffect(() => {
    getData();

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
            value={dashboard.infractions}
            color="bg-red-100 text-red-700"
            icon={<ShieldAlert size={30} />}
          />
        </div>

        {/* Placeholder */}

        <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 py-20 text-center">
          <h3 className="text-2xl font-bold text-slate-700">Activity Centre</h3>

          <p className="mt-3 text-slate-500">
            Recent registrations, simulations and infractions will appear here.
          </p>
        </div>
      </div>
    </div>
  );
}
