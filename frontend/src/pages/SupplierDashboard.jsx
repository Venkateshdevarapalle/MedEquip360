import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function SupplierDashboard() {
  const [totalEquipment, setTotalEquipment] = useState(0);
  const [equipment, setEquipment] = useState([]);

  const [orderStats, setOrderStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/equipment/stats/count`)
      .then((res) => {
        setTotalEquipment(res.data.totalEquipment);
      });

    axios
      .get(`${API_URL}/api/equipment`)
      .then((res) => {
        setEquipment(res.data);
      });

    axios
      .get(`${API_URL}/api/orders/stats`)
      .then((res) => {
        setOrderStats(res.data);
      });
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Supplier Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500">
            Total Equipment
          </h3>

          <p className="text-4xl font-bold mt-3">
            {totalEquipment}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500">
            Total Orders
          </h3>

          <p className="text-4xl font-bold mt-3">
            {orderStats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500">
            Pending Orders
          </h3>

          <p className="text-4xl font-bold mt-3">
            {orderStats.pendingOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-gray-500">
            Delivered Orders
          </h3>

          <p className="text-4xl font-bold mt-3">
            {orderStats.deliveredOrders}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Recent Equipment
        </h2>

        <div className="space-y-3">
          {equipment.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border-b pb-2"
            >
              <span>{item.name}</span>

              <span className="text-gray-500">
                Qty: {item.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SupplierDashboard;