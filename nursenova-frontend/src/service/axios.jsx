import axios from "axios";
import errorHandle from "../api/error";
import { store } from "../redux/Store";
const BASE_URL = "http://localhost:8222";

const Api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      errorHandle(error);
    } else {
      console.log("axios error:", error);
    }
    return Promise.reject(error);
  }
);

Api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Request error:", error);
    return Promise.reject(error);
  }
);

export default Api;
