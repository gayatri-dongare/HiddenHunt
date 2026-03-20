import axios from "axios";

const API = axios.create({
  baseURL: "https://hiddenhunt-backend.onrender.com/api",
});

// REGISTER
export const registerUser = (data) => {
  return API.post("/auth/register", data);
};

// LOGIN
export const loginUser = (data) => {
  return API.post("/auth/login", data);
};

// VERIFY OTP
export const verifyOtp = (data) => {
  return API.post("/auth/verify-otp", data);
};