import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  const [formData, setFormData] = useState({
    equipment: "",
    quantity: ""
  });

  const fetchOrders = () => {
    axios
      .get("http://localhost:5000/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        formData
      );

      setFormData({
        equipment: "",
        quantity: ""
      });

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/orders/${id}`
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${id}`,
        { status }
      );

      fetchOrders();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Hospital Orders
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md mb-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-3 gap-4"
        >
          <input
            type="text"
            name="equipment"
            placeholder="Equipment Name"
            value={formData.equipment}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg"
          >
            Place Order
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Equipment</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b"
              >
                <td className="p-4">
                  {order.id}
                </td>

                <td className="p-4">
                  {order.equipment}
                </td>

                <td className="p-4">
                  {order.quantity}
                </td>

                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(
                        order.id,
                        e.target.value
                      )
                    }
                    className="border rounded p-2"
                  >
                    <option>
                      Pending
                    </option>

                    <option>
                      Approved
                    </option>

                    <option>
                      Dispatched
                    </option>

                    <option>
                      Delivered
                    </option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      handleDelete(order.id)
                    }
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;