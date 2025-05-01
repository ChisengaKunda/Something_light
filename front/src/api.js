import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  timeout: 10000000000000000,
});

// Inject Basic auth header on every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Basic ${token}`;
  }
  console.debug(
    "[API Request]",
    config.method?.toUpperCase(),
    config.url
  );
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(
      "[API Error]",
      error.response?.status,
      error.config.url
    );
    return Promise.reject(error);
  }
);

export default api;
