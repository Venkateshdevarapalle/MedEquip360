import { useEffect, useState } from "react";
import {
  getEquipment,
  getOrders,
} from "../api/api";

function SupplierDashboard() {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalEquipment: 0,
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [equipmentRes, ordersRes] = await Promise.all([
        getEquipment(),
        getOrders(),
      ]);

      const equipmentData = equipmentRes.data;
      const ordersData = ordersRes.data;

      const totalQuantity = equipmentData.reduce(
        (sum, item) => sum + Number(item.quantity || 0),
        0
      );

      const pendingOrders = ordersData.filter(
        (order) =>
          order.order_status?.toLowerCase() === "pending"
      ).length;

      const deliveredOrders = ordersData.filter(
        (order) =>
          order.order_status?.toLowerCase() === "delivered"
      ).length;

      setEquipment(equipmentData);

      setStats({
        totalEquipment: equipmentData.length,
        totalOrders: ordersData.length,
        pendingOrders,
        deliveredOrders,
        totalQuantity,
      });
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">

      <h1 className="text-4xl font-bold mb-8">
        Supplier Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Equipment Types
          </h3>

          <p className="text-4xl font-bold mt-3">
            {stats.totalEquipment}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Total Quantity
          </h3>

          <p className="text-4xl font-bold mt-3">
            {stats.totalQuantity}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Total Orders
          </h3>

          <p className="text-4xl font-bold mt-3">
            {stats.totalOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Pending Orders
          </h3>

          <p className="text-4xl font-bold mt-3 text-yellow-500">
            {stats.pendingOrders}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-gray-500">
            Delivered Orders
          </h3>

          <p className="text-4xl font-bold mt-3 text-green-600">
            {stats.deliveredOrders}
          </p>
        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-5">
          Recent Equipment
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Name
              </th>

              <th className="text-left">
                Category
              </th>

              <th className="text-left">
                Manufacturer
              </th>

              <th className="text-left">
                Quantity
              </th>

              <th className="text-left">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {equipment.slice(0, 10).map((item) => (

              <tr
                key={item.equipment_id}
                className="border-b hover:bg-gray-50"
              >

                <td className="py-3">
                  {item.equipment_name}
                </td>

                <td>
                  {item.category}
                </td>

                <td>
                  {item.manufacturer}
                </td>

                <td>
                  {item.quantity}
                </td>

                <td>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">

                    {item.status}

                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default SupplierDashboard;
