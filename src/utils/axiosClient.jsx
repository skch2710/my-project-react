import axios from "axios";
import { LOGOUT_API, REFRESH_TOKEN_API } from "./constants";
import { logoutUser } from "../store/slices/authSlice";

/* Normal API */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

/* Refresh API (NO interceptor) */
export const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const setupAxiosInterceptors = (store) => {
  let logoutInFlight = null;

  const performLogout = async () => {
    if (logoutInFlight) {
      await logoutInFlight;
      return;
    }

    logoutInFlight = (async () => {
      try {
        await store.dispatch(logoutUser());
      } finally {
        sessionStorage.removeItem("persist:root");
        window.location.replace("/login");
      }
    })();

    try {
      await logoutInFlight;
    } finally {
      logoutInFlight = null;
    }
  };

  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const status = error.response?.status;
      const originalRequest = error.config;

      if (status !== 401) {
        return Promise.reject(error);
      }

      // If logout API itself returns 401, do not trigger refresh/logout recursion.
      if (originalRequest?.url?.includes(LOGOUT_API)) {
        return Promise.reject(error);
      }

      // Refresh API itself failed -> logout
      if (originalRequest?.url?.includes(REFRESH_TOKEN_API)) {
        await performLogout();
        return Promise.reject(error);
      }

      // Prevent infinite retry
      if (originalRequest._retry) {
        await performLogout();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        await refreshApi.post(REFRESH_TOKEN_API);
        return api(originalRequest);
      } catch (refreshError) {
        await performLogout();
        return Promise.reject(refreshError);
      }
    }
  );
};
