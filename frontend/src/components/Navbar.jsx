import { Search, Bell, UserCircle } from "lucide-react";

function Navbar() {
  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-8">

      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          MedEquip360
        </h2>

        <p className="text-sm text-slate-500">
          Medical Equipment Supply & Service Management
        </p>
      </div>

      <div className="flex items-center gap-6">

        <div className="relative">

          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none w-72"
          />

        </div>

        <button className="relative">

          <Bell size={24} />

          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">

            3

          </span>

        </button>

        <div className="flex items-center gap-2">

          <UserCircle
            size={40}
            className="text-slate-700"
          />

          <div>

            <p className="font-semibold">
              Supplier Admin
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;
