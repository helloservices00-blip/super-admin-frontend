import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://super-backend-bzin.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);
l
