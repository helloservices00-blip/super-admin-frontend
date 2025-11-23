import axios from "axios";

const API = import.meta.env.VITE_API_URL || "https://super-backend-bzin.onrender.com";

export const adminApi = axios.create({
  baseURL: API,
});
