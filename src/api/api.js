// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://super-backend-bzin.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// --- Auth ---
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// --- Products ---
export const getProducts = () => API.get("/products"); // all products
export const getProduct = (id) => API.get(`/products/${id}`); // single product by id

// --- JWT helper ---
export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};

export default API;
