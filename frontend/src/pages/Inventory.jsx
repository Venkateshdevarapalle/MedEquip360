import { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {
  const [equipment, setEquipment] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    manufacturer: "",
    quantity: ""
  });

  const fetchEquipment = () => {
    axios
      .get("http://localhost:5000/api/equipment")
      .then((response) => {
        setEquipment(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchEquipment();
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
      if (editId) {
  await axios.put(
    `http://localhost:5000/api/equipment/${editId}`,
    formData
  );

  setEditId(null);
} else {
  await axios.post(
    "http://localhost:5000/api/equipment",
    formData
  );
}

      setFormData({
        name: "",
        category: "",
        manufacturer: "",
        quantity: ""
      });

setEditId(null);
      fetchEquipment();
    } catch (error) {
      console.error(error);
    }
  };
const handleEdit = (item) => {
  setEditId(item.id);

  setFormData({
    name: item.name,
    category: item.category,
    manufacturer: item.manufacturer,
    quantity: item.quantity
  });
};
  const handleDelete = async (id) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/equipment/${id}`
    );

    fetchEquipment();
  } catch (error) {
    console.error(error);
  }
}; 

  return (
  <div className="p-8">
    <h1 className="text-4xl font-bold mb-8">
      Equipment Inventory
    </h1>

    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-4 gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Equipment Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={formData.manufacturer}
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
          className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
        >
          {editId
            ? "Update Equipment"
            : "Add Equipment"}
        </button>
      </form>
    </div>

    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-800 text-white">
          <tr>
            <th className="p-4 text-left">ID</th>
            <th className="p-4 text-left">Name</th>
            <th className="p-4 text-left">Category</th>
            <th className="p-4 text-left">Manufacturer</th>
            <th className="p-4 text-left">Quantity</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>

        <tbody>
          {equipment.map((item) => (
            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="p-4">{item.id}</td>
              <td className="p-4">{item.name}</td>
              <td className="p-4">{item.category}</td>
              <td className="p-4">{item.manufacturer}</td>
              <td className="p-4">{item.quantity}</td>

              <td className="p-4 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

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

export default Inventory;