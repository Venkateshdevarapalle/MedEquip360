import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import SupplierDashboard from "./pages/SupplierDashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Service from "./pages/Service";
import Warranty from "./pages/Warranty";
import Maintenance from "./pages/Maintenance";

function App() {
  return (
    <BrowserRouter>
<div className="flex min-h-screen bg-slate-100">        <Sidebar />

        <div className="flex-1">
          <Routes>
            <Route
              path="/"
              element={<SupplierDashboard />}
            />

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />

            <Route
              path="/service"
              element={<Service />}
            />

            <Route
              path="/warranty"
              element={<Warranty />}
            />

            <Route
              path="/maintenance"
              element={<Maintenance />}
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;