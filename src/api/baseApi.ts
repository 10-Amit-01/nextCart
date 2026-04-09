import axios from "axios";

const baseUrl = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    
  },
});

baseUrl.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

baseUrl.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.response.data.message === "Unauthorized") { 
      const token = localStorage.getItem("token");
      if (token) {
        const response = await baseUrl.post("/auth/refreshToken", { token });
        localStorage.setItem("token", response.data.token);
        return baseUrl(error.config);
      }
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default baseUrl;
