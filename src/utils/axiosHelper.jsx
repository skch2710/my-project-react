import axios from "axios";
import { toast } from "react-toastify";
import { isTokenExpired } from "../utils/tokenUtils";
import { REFRESH_TOKEN_API, LOGIN_API } from "./constants";
import { updateToken, logoutUser } from "../store/slices/authSlice";
import { clearUser } from "../store/slices/userSlice";

/* ======================================
   INJECT REDUX STORE
====================================== */
let appStore = null;

export const injectStore = (_store) => {
  appStore = _store;
};

/* ======================================
   AXIOS INSTANCES
====================================== */
const axiosHelper = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const refreshAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

/* ======================================
   REFRESH CONTROL
====================================== */
let isRefreshing = false;
let pendingQueue = [];

/* ======================================
   REQUEST INTERCEPTOR
====================================== */
axiosHelper.interceptors.request.use(async (config) => {
  // ✅ Skip auth endpoints
  if (
    config.url.includes(LOGIN_API) ||
    config.url.includes(REFRESH_TOKEN_API)
  ) {
    return config;
  }

  if (!appStore) return config;

  const state = appStore.getState();

  // ✅ Read from authSlice
  const { token, refreshToken } = state?.auth || {};

  // ✅ Token valid → continue request
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  }

  // ✅ No refresh token → logout
  if (!refreshToken) {
    handleLogout();
    return Promise.reject("No refresh token");
  }

  // ✅ Queue calls while refreshing
  if (isRefreshing) {
    return new Promise((resolve) => {
      pendingQueue.push((newToken) => {
        config.headers.Authorization = `Bearer ${newToken}`;
        resolve(config);
      });
    });
  }

  isRefreshing = true;

  try {
    const response = await REFRESH_TOKEN(refreshToken);

    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;

    // ✅ Update tokens in auth slice
    appStore.dispatch(
      updateToken({
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      })
    );

    // ✅ Resume queued requests
    pendingQueue.forEach((cb) => cb(newAccessToken));
    pendingQueue = [];

    // ✅ Retry original request
    config.headers.Authorization = `Bearer ${newAccessToken}`;
    return config;
  } catch (err) {
    pendingQueue = [];
    handleLogout();
    return Promise.reject(err);
  } finally {
    isRefreshing = false;
  }
});

/* ======================================
   REFRESH TOKEN CALL
====================================== */
const REFRESH_TOKEN = async (refreshToken) => {
  return await refreshAxios.post(REFRESH_TOKEN_API, {
    refresh_token: refreshToken,
  });
};

/* ======================================
   API HELPERS
====================================== */
export const GET = async (endpoint, params = {}) => {
  try {
    const response = await axiosHelper.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("GET error:", error);
    toast.error("Something went wrong!");
    throw error;
  }
};

export const POST = async (endpoint, payload) => {
  try {
    const response = await axiosHelper.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("POST error:", error);
    toast.error(error.response?.data?.errorMessage || error.message);
    throw error;
  }
};

export default axiosHelper;
