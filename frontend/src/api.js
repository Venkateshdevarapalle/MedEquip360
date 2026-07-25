// src/api/api.js

import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ==========================
// Request Interceptor
// ==========================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ==========================
// Response Interceptor
// ==========================
api.interceptors.response.use(
  (response) => response,

  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized");
          break;

        case 403:
          console.error("Forbidden");
          break;

        case 404:
          console.error("API Not Found");
          break;

        case 500:
          console.error("Internal Server Error");
          break;

        default:
          console.error(error.response.data);
      }
    } else {
      console.error("Network Error");
    }

    return Promise.reject(error);
  }
);

// ==========================
// Authentication APIs
// ==========================
export const login = (data) => api.post("/auth/login", data);

export const register = (data) => api.post("/auth/register", data);

// ==========================
// Equipment APIs
// ==========================
export const getEquipment = () => api.get("/equipment");

export const getEquipmentById = (id) =>
  api.get(`/equipment/${id}`);

export const addEquipment = (data) =>
  api.post("/equipment", data);

export const updateEquipment = (id, data) =>
  api.put(`/equipment/${id}`, data);

export const deleteEquipment = (id) =>
  api.delete(`/equipment/${id}`);

// ==========================
// Orders APIs
// ==========================
export const getOrders = () => api.get("/orders");

export const getOrderById = (id) =>
  api.get(`/orders/${id}`);

export const addOrder = (data) =>
  api.post("/orders", data);

export const updateOrder = (id, data) =>
  api.put(`/orders/${id}`, data);

export const deleteOrder = (id) =>
  api.delete(`/orders/${id}`);

// ==========================
// Maintenance APIs
// ==========================
export const getMaintenance = () =>
  api.get("/maintenance");

export const getMaintenanceById = (id) =>
  api.get(`/maintenance/${id}`);

export const addMaintenance = (data) =>
  api.post("/maintenance", data);

export const updateMaintenance = (id, data) =>
  api.put(`/maintenance/${id}`, data);

export const deleteMaintenance = (id) =>
  api.delete(`/maintenance/${id}`);

// ==========================
// Warranty APIs
// ==========================
export const getWarranty = () =>
  api.get("/warranty");

export const getWarrantyById = (id) =>
  api.get(`/warranty/${id}`);

export const addWarranty = (data) =>
  api.post("/warranty", data);

export const updateWarranty = (id, data) =>
  api.put(`/warranty/${id}`, data);

export const deleteWarranty = (id) =>
  api.delete(`/warranty/${id}`);

// ==========================
// Service APIs
// ==========================
export const getServices = () =>
  api.get("/services");

export const getServiceById = (id) =>
  api.get(`/services/${id}`);

export const addService = (data) =>
  api.post("/services", data);

export const updateService = (id, data) =>
  api.put(`/services/${id}`, data);

export const deleteService = (id) =>
  api.delete(`/services/${id}`);

// ==========================
// Dashboard APIs
// ==========================
export const getDashboardStats = () =>
  api.get("/dashboard");

// ==========================
// Export Axios Instance
// ==========================
export default api;
