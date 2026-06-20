import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Warranty() {
  const [warranties, setWarranties] = useState([]);

  const [formData, setFormData] = useState({
    equipment: "",
    expiryDate: "",
    status: "Active"
  });

  const fetchWarranty = () => {
    axios
      .get(`${API_URL}/api/warranty`)
      .then((response) => {
        setWarranties(response.data);
      });
  };

  useEffect(() => {
    fetchWarranty();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post(
      `${API_URL}/api/warranty`,
      formData
    );

    setFormData({
      equipment: "",
      expiryDate: "",
      status: "Active"
    });

    fetchWarranty();
  };

  const handleDelete = async (id) => {
    await axios.delete(
      `${API_URL}/api/warranty/${id}`
    );

    fetchWarranty();
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Warranty Tracking
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
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg"
          >
            Add Warranty
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Equipment</th>
              <th className="p-4 text-left">Expiry Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {warranties.map((item) => (
              <tr
                key={item.id}
                className="border-b"
              >
                <td className="p-4">{item.id}</td>
                <td className="p-4">{item.equipment}</td>
                <td className="p-4">{item.expiryDate}</td>
                <td className="p-4">{item.status}</td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      handleDelete(item.id)
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

export default Warranty;