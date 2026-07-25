import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Boxes,
  ClipboardList,
  Wrench,
  ShieldCheck,
  CalendarClock,
  LogOut,
  Hospital,
} from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Inventory",
      path: "/inventory",
      icon: <Boxes size={20} />,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: <ClipboardList size={20} />,
    },
    {
      name: "Service",
      path: "/service",
      icon: <Wrench size={20} />,
    },
    {
      name: "Warranty",
      path: "/warranty",
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "Maintenance",
      path: "/maintenance",
      icon: <CalendarClock size={20} />,
    },
  ];

  return (
    <aside className="w-72 bg-slate-900 text-white flex flex-col shadow-2xl">

      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-slate-700">
        <Hospital size={36} className="text-blue-400" />

        <div>
          <h1 className="text-2xl font-bold">
            MedEquip360
          </h1>

          <p className="text-sm text-slate-400">
            Supplier Portal
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 mt-6 px-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 p-4 rounded-xl mb-2 transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            {item.icon}

            <span className="font-medium">
              {item.name}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* User */}
      <div className="border-t border-slate-700 p-5">

        <div className="mb-5">
          <p className="font-semibold">
            Supplier Admin
          </p>

          <p className="text-sm text-slate-400">
            administrator@medequip360.com
          </p>
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 py-3 rounded-lg transition"
        >
          <LogOut size={18} />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;
