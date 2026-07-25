import React, { useEffect, useState } from "react";
import {
  getEquipment,
  addEquipment,
  updateEquipment,
  deleteEquipment,
} from "../api/api";

const Inventory = () => {
  const [equipment, setEquipment] = useState([]);

  const [formData, setFormData] = useState({
    equipment_name: "",
    category: "",
    manufacturer: "",
    model_number: "",
    serial_number: "",
    quantity: "",
    unit_price: "",
    supplier_id: "",
    purchase_date: "",
    status: "Available",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const res = await getEquipment();
      setEquipment(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setEditingId(null);

    setFormData({
      equipment_name: "",
      category: "",
      manufacturer: "",
      model_number: "",
      serial_number: "",
      quantity: "",
      unit_price: "",
      supplier_id: "",
      purchase_date: "",
      status: "Available",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateEquipment(editingId, formData);
      } else {
        await addEquipment(formData);
      }

      fetchEquipment();
      clearForm();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.equipment_id);

    setFormData({
      equipment_name: item.equipment_name,
      category: item.category,
      manufacturer: item.manufacturer,
      model_number: item.model_number,
      serial_number: item.serial_number,
      quantity: item.quantity,
      unit_price: item.unit_price,
      supplier_id: item.supplier_id,
      purchase_date: item.purchase_date
        ? item.purchase_date.substring(0, 10)
        : "",
      status: item.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this equipment?")) return;

    try {
      await deleteEquipment(id);
      fetchEquipment();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Equipment Inventory</h2>

      <form onSubmit={handleSubmit} className="mb-4">

        <input
          type="text"
          name="equipment_name"
          placeholder="Equipment Name"
          value={formData.equipment_name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="manufacturer"
          placeholder="Manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
        />

        <input
          type="text"
          name="model_number"
          placeholder="Model Number"
          value={formData.model_number}
          onChange={handleChange}
        />

        <input
          type="text"
          name="serial_number"
          placeholder="Serial Number"
          value={formData.serial_number}
          onChange={handleChange}
        />

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <input
          type="number"
          name="unit_price"
          placeholder="Unit Price"
          value={formData.unit_price}
          onChange={handleChange}
        />

        <input
          type="number"
          name="supplier_id"
          placeholder="Supplier ID"
          value={formData.supplier_id}
          onChange={handleChange}
        />

        <input
          type="date"
          name="purchase_date"
          value={formData.purchase_date}
          onChange={handleChange}
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option>Available</option>
          <option>In Use</option>
          <option>Under Maintenance</option>
          <option>Out of Stock</option>
        </select>

        <button type="submit">
          {editingId ? "Update Equipment" : "Add Equipment"}
        </button>

        <button
          type="button"
          onClick={clearForm}
        >
          Clear
        </button>

      </form>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Manufacturer</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {equipment.map((item) => (
            <tr key={item.equipment_id}>
              <td>{item.equipment_id}</td>
              <td>{item.equipment_name}</td>
              <td>{item.category}</td>
              <td>{item.manufacturer}</td>
              <td>{item.quantity}</td>
              <td>{item.status}</td>

              <td>
                <button onClick={() => handleEdit(item)}>
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(item.equipment_id)
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default Inventory;
