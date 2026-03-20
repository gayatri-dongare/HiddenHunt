import axios from "axios";

const API = axios.create({
  baseURL: "https://hiddenhunt-backend.onrender.com/api", // Update with your backend URL
});

// attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;