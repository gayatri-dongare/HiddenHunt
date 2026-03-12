import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

const getToken = () => {
  return localStorage.getItem("token");
};

export const getGems = () => {
  return API.get("/gems", {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getSingleGem = (id) => {
  return API.get(`/gems/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const likeGem = (id) => {
  return API.post(`/gems/${id}/like`, {}, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getComments = (gemId) => {
  return API.get(`/comments/${gemId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const addComment = (gemId, text) => {
  return API.post(`/comments/${gemId}`, { text }, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const createGem = (formData) => {
  return API.post("/gems", formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data"
    }
  });
};

export const searchGems = (query) => {
  return API.get(`/gems/search?q=${query}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getTrendingGems = () => {
  return API.get("/gems/trending", {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const getUserGems = (userId) => {
  return API.get(`/gems/user/${userId}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};

export const deleteGem = (id) => {
  return API.delete(`/gems/${id}`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });
};