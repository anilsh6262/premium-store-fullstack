import axios from "axios";

export const API = axios.create({
  baseURL: "https://premium-store-backend.onrender.com/api/auth/login", // ✅ REMOVE /api
});