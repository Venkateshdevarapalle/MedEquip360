import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-64 h-screen bg-slate-900 text-white p-6 shadow-lg">
      <h1 className="text-2xl font-bold mb-10">
        🏥 MedEquip360
      </h1>

      <nav className="flex flex-col gap-4">
        <Link
          className="hover:bg-slate-700 p-3 rounded-lg transition"
          to="/"
        >
          📊 Dashboard
        </Link>

        <Link
          className="hover:bg-slate-700 p-3 rounded-lg transition"
          to="/inventory"
        >
          📦 Inventory
        </Link>

        <Link
          className="hover:bg-slate-700 p-3 rounded-lg transition"
          to="/orders"
        >
          📋 Orders
        </Link>

        <Link
          className="hover:bg-slate-700 p-3 rounded-lg transition"
          to="/service"
        >
          🛠 Service
        </Link>

        <Link
          className="hover:bg-slate-700 p-3 rounded-lg transition"
          to="/warranty"
        >
          🛡 Warranty
        </Link>

        <Link
          className="hover:bg-slate-700 p-3 rounded-lg transition"
          to="/maintenance"
        >
          📅 Maintenance
        </Link>
      </nav>
    </div>
  );
}

export default Sidebar;