import axios from "axios";

// export const server = import.meta.env.BACKEND_URI;
export const server =
  import.meta.env["VITE_BACKEND_URI"] || "http://localhost:4000";

export const axiosInstance = axios.create({
  baseURL: `${server}/api/v1`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
