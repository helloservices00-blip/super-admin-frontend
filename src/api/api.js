// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://super-backend-bzin.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// ---------------------
// --- Auth Endpoints ---
// ---------------------
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// -----------------------
// --- Products Endpoints ---
// -----------------------
export const getProducts = () => API.get("/products"); // All products
export const getProduct = (id) => API.get(`/products/${id}`); // Single product by id
export const createProduct = (data) => API.post("/products", data); // Optional, admin
export const updateProduct = (id, data) => API.put(`/products/${id}`, data); // Optional
export const deleteProduct = (id) => API.delete(`/products/${id}`); // Optional

// -----------------------
// --- Orders Endpoints ---
// -----------------------
export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrders = () => API.get("/orders");

// ------------------------
// --- Vendors Endpoints ---
// ------------------------
export const getVendors = () => API.get("/vendors"); // All vendors
export const getVendor = (id) => API.get(`/vendors/${id}`); // Single vendor by id
export const createVendor = (data) => API.post("/vendors", data); // Optional, admin
export const updateVendor = (id, data) => API.put(`/vendors/${id}`, data); // Optional
export const deleteVendor = (id) => API.delete(`/vendors/${id}`); // Optional

// ----------------------
// --- JWT Helper ---
// ----------------------
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
