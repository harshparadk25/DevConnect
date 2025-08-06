import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://devconnectback.onrender.com/api", 
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});


export default axiosInstance;
