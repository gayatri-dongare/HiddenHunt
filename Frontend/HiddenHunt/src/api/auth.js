import axios from "axios";

const API = axios.create({
  baseURL: "https://hiddenhunt-backend.onrender.com",
});

// REGISTER
export const registerUser = async (data) => {
  return API.post("/api/auth/register", data);
};

// LOGIN
export const loginUser = async (data) => {
  return API.post("/api/auth/login", data);
};

// VERIFY OTP
export const verifyOtp = async (data) => {
  return API.post("/api/auth/verify-otp", data);
};