import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import SupplierDashboard from "./pages/SupplierDashboard";
import Inventory from "./pages/Inventory";
import Orders from "./pages/Orders";
import Service from "./pages/Service";
import Warranty from "./pages/Warranty";
import Maintenance from "./pages/Maintenance";

function App() {
  return (
    <BrowserRouter>
      <Layout>
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

          {/* 404 Page */}
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center h-full py-32">
                <h1 className="text-7xl font-bold text-slate-700">
                  404
                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                  Page Not Found
                </p>
              </div>
            }
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
