import axios from "axios";

const API = axios.create({
  baseURL: "https://hiddenhunt-backend.onrender.com/api"
});

export const loginUser = (data) =>
  API.post("/auth/login", data);

export const registerUser = (data) =>
  API.post("/auth/register", data);

export const verifyOtp = (data) =>
  API.post("/auth/verify-otp", data);
