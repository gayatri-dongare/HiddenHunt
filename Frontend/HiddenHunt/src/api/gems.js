import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

const authHeader = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`
});

export const getGems = () => {
  return API.get("/gems", { headers: authHeader() });
};

export const getSingleGem = (id) => {
  return API.get(`/gems/${id}`, { headers: authHeader() });
};

export const likeGem = (id) => {
  return API.post(`/gems/${id}/like`, {}, { headers: authHeader() });
};

export const getComments = (gemId) => {
  return API.get(`/comments/${gemId}`, { headers: authHeader() });
};

export const addComment = (gemId, text) => {
  return API.post(`/comments/${gemId}`, { text }, { headers: authHeader() });
};

export const createGem = (formData) => {
  return API.post("/gems", formData, {
    headers: {
      ...authHeader(),
      "Content-Type": "multipart/form-data"
    }
  });
};

export const searchGems = (query) => {
  return API.get(`/gems/search?q=${query}`, { headers: authHeader() });
};

export const getTrendingGems = () => {
  return API.get("/gems/trending", { headers: authHeader() });
};

export const getUserGems = (userId) => {
  return API.get(`/gems/user/${userId}`, { headers: authHeader() });
};

export const deleteGem = (id) => {
  return API.delete(`/gems/${id}`, { headers: authHeader() });
};

export const updateGem = (id, data) => {
  return API.put(`/gems/${id}`, data, { headers: authHeader() });
};