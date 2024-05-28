import axios from "axios";

// Create an Axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true, // Set to true to include credentials with requests
});

export default api;
