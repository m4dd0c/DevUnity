import axios from "axios";
import { showToast } from "./utils";

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
// may use interceptor later for error handling
axiosInstance.interceptors.response.use(
  (res) => res,
  (error): Promise<string> => {
    // Any status codes outside the range of 2xx will trigger this function
    if (axios.isAxiosError(error)) {
      // checking for specific error codes or responses here
      console.error(
        "Axios error occurred:",
        error.response?.data.message || error.message,
      );
      showToast({
        message: error.response?.data.message || error.message,
        type: "error",
      });
    } else {
      console.error("Unexpected error occurred:", error.message);
      showToast({ message: error.message, type: "error" });
    }
    // Optionally, return a rejected promise to propagate the error further
    return Promise.reject(error);
  },
);
