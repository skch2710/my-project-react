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
  let refreshInFlight = null;

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
      const messageStatusMatch =
        typeof error?.message === "string"
          ? error.message.match(/status code\s+(\d{3})/i)
          : null;
      const rawStatus =
        error?.response?.status ??
        error?.request?.status ??
        error?.status ??
        error?.toJSON?.()?.status ??
        messageStatusMatch?.[1];
      const status = Number(rawStatus);
      const originalRequest = error?.config;
      const requestUrl = originalRequest?.url || "";

      if (import.meta.env.DEV) {
        console.debug("[AXIOS][ERROR]", {
          rawStatus,
          status,
          url: requestUrl,
          retry: originalRequest?._retry,
        });
      }

      if (status !== 401) {
        return Promise.reject(error);
      }

      // Rare branch: error can carry 401 but not have request config.
      // Refresh once so cookie/session can be renewed for following calls.
      if (!originalRequest) {
        try {
          await refreshApi.post(REFRESH_TOKEN_API);
        } catch (refreshError) {
          await performLogout();
          return Promise.reject(refreshError);
        }
        return Promise.reject(error);
      }

      // If logout API itself returns 401, do not trigger refresh/logout recursion.
      if (requestUrl.includes(LOGOUT_API)) {
        return Promise.reject(error);
      }

      // Refresh API itself failed -> logout
      if (requestUrl.includes(REFRESH_TOKEN_API)) {
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
        if (!refreshInFlight) {
          if (import.meta.env.DEV) {
            console.debug("[AXIOS][REFRESH] Starting refresh token call");
          }
          refreshInFlight = refreshApi
            .post(REFRESH_TOKEN_API)
            .finally(() => {
              refreshInFlight = null;
            });
        }
        await refreshInFlight;
        if (import.meta.env.DEV) {
          console.debug("[AXIOS][REFRESH] Refresh success, retrying request", {
            url: requestUrl,
          });
        }
        return api(originalRequest);
      } catch (refreshError) {
        if (import.meta.env.DEV) {
          console.debug("[AXIOS][REFRESH] Refresh failed, logging out");
        }
        await performLogout();
        return Promise.reject(refreshError);
      }
    }
  );
};
