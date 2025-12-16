import axios from "axios";
import { REFRESH_TOKEN_API } from "./constants";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/* ======================
   REFRESH CONTROL
====================== */
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error) => {
  failedQueue.forEach((p) => {
    error ? p.reject(error) : p.resolve();
  });
  failedQueue = [];
};

/* ======================
   RESPONSE INTERCEPTOR
====================== */
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes(REFRESH_TOKEN_API)
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post(REFRESH_TOKEN_API);
        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

/* ======================
   API HELPERS
====================== */
export const GET = (url, params = {}) =>
  api.get(url, { params }).then((res) => res.data);

export const POST = (url, payload) =>
  api.post(url, payload).then((res) => res.data);

export default api;
