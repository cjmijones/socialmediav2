import axios from "axios";
import store from "../redux/store";
import { logout } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Add a request interceptor to include the token in the headers
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const tokenExpiry = localStorage.getItem("tokenExpiry");

    if (token && tokenExpiry) {
      if (Date.now() > parseInt(tokenExpiry)) {
        store.dispatch(logout());
        const navigate = useNavigate();
        navigate("/signin");
      } else {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle expired token errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.message === "Token expired"
    ) {
      store.dispatch(logout());
      const navigate = useNavigate();
      navigate("/signin");
    }
    return Promise.reject(error);
  }
);

export default api;
