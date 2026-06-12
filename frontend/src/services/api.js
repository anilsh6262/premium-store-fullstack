import axios from "axios";

export const API = axios.create({
  baseURL: "https://premium-store-fullstack-1.onrender.com/", // ✅ REMOVE /api
});