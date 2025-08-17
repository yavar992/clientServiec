import axios from "axios";

const api = axios.create({
  baseURL:
    "https://foodapp-env.eba-db8ewiut.eu-north-1.elasticbeanstalk.com/api/v1",
  timeout: 10000, // 10 second timeout
});

// Request interceptor for JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("jwtToken");
      window.location.href = "/account/login";
    }
    return Promise.reject(error);
  }
);

export default api;
