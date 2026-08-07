import {
  Computer,
  Home,
  Network,
  ShieldAlert,
  UserCircle2,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import logo from "../assets/logo.png";
import { useAppUser } from "../contexts/AppUserContext";

const menus = [
  {
    label: "Home",
    icon: Home,
    path: "/",
  },
  {
    label: "Computers",
    icon: Computer,
    path: "/computers",
  },
  {
    label: "Network Tests",
    icon: Network,
    path: "/network-tests",
  },
  {
    label: "Infractions",
    icon: ShieldAlert,
    path: "/infractions",
  },
  {
    label: "Profile",
    icon: UserCircle2,
    path: "/profile",
  },
];

export default function Navbar() {
  const { user } = useAppUser();
  return (
    <header className="sticky top-0 z-50 border-b border-emerald-200/40 bg-white/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Left */}

        <div className="flex items-center gap-5">
          <div
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-2xl
            bg-gradient-to-br
            from-emerald-800
            via-green-700
            to-lime-500
            shadow-lg
            shadow-green-800/30
          "
          >
            <img src={logo} alt="JAMB" className="h-10 w-10 object-contain" />
          </div>

          <div>
            <h2 className="text-xl font-black tracking-tight text-slate-800">
              JAMB TEST
            </h2>

            <p className="text-sm text-slate-500">Version 2.0</p>
          </div>
        </div>

        {/* Center */}

        <nav className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 p-2 lg:flex">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `
                  flex
                  items-center
                  gap-2
                  rounded-full
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-700 to-green-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-white hover:text-green-700"
                  }
                `
                }
              >
                <Icon size={18} />

                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Right */}

        <div className="flex items-center gap-4">
          <div className="hidden text-right md:block">
            <p className="text-sm text-slate-500">Logged in as</p>

            <h3 className="font-bold text-slate-800">
              {user?.referenceNumber}
            </h3>
          </div>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            bg-red-50
            px-5
            py-3
            font-semibold
            text-red-600
            transition
            hover:bg-red-600
            hover:text-white
          "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
