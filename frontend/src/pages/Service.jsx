import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config";

function Service() {
  const [tickets, setTickets] = useState([]);

  const [formData, setFormData] = useState({
    equipment: "",
    issue: ""
  });

  const fetchTickets = () => {
    axios
      .get(`${API_URL}/api/service`)
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchTickets();
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
        `${API_URL}/api/service`,
        formData
      );

      setFormData({
        equipment: "",
        issue: ""
      });

      fetchTickets();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/Service/${id}`
      );

      fetchTickets();
    } catch (error) {
      console.error(error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/api/Service/${id}`,
        { status }
      );

      fetchTickets();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">
        Service & Maintenance
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
            type="text"
            name="issue"
            placeholder="Issue Description"
            value={formData.issue}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-green-600 text-white rounded-lg"
          >
            Create Ticket
          </button>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Equipment</th>
              <th className="p-4 text-left">Issue</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className="border-b"
              >
                <td className="p-4">
                  {ticket.id}
                </td>

                <td className="p-4">
                  {ticket.equipment}
                </td>

                <td className="p-4">
                  {ticket.issue}
                </td>

                <td className="p-4">
                  <select
                    value={ticket.status}
                    onChange={(e) =>
                      updateStatus(
                        ticket.id,
                        e.target.value
                      )
                    }
                    className="border rounded p-2"
                  >
                    <option>
                      Pending
                    </option>

                    <option>
                      Assigned
                    </option>

                    <option>
                      In Progress
                    </option>

                    <option>
                      Completed
                    </option>
                  </select>
                </td>

                <td className="p-4">
                  <button
                    onClick={() =>
                      handleDelete(ticket.id)
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

export default Service;