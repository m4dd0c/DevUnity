import axios from "axios";

// TODO: make it accessible from .env
export const server = "http://localhost:4000";
export const axiosInstance = axios.create({
  baseURL: `${server}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
