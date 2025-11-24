// src/api/api.js
import axios from "axios";

export const API = axios.create({
  baseURL: "https://super-backend-bzin.onrender.com/api", // your deployed backend
});

// --------------------
// Set auth token for all requests
// --------------------
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

// --------------------
// AUTH
// --------------------
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// --------------------
// PRODUCTS
// --------------------
export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);

// --------------------
// ORDERS
// --------------------
export const createOrder = (data) => API.post("/orders", data);
export const getOrders = () => API.get("/orders");

// --------------------
// VENDORS
// --------------------
export const getVendors = () => API.get("/vendors");
export const getVendor = (id) => API.get(`/vendors/${id}`);
export const createVendor = (data) => API.post("/vendors", data);
export const updateVendor = (id, data) => API.put(`/vendors/${id}`, data);
export const deleteVendor = (id) => API.delete(`/vendors/${id}`);
