import axios from "axios";
import { REFRESH_TOKEN_API } from "./constants";
import FileSaver from "file-saver";
import { toast } from "react-toastify";

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

export const POST = async (url, payload) =>
  await api.post(url, payload).then((res) => res.data);

export const DOWNLOAD_FILE = async (url, payload) => {
  try {
    const response = await api.post(url, payload, { responseType: "blob" });
    if (response && response.status === 200 && response.data) {
      const fileType = response.headers["content-type"];
      const filename =
        response.headers["content-disposition"]?.match(/filename="(.+?)"/)[1];
      const blob = new Blob([response.data], { type: fileType });
      FileSaver.saveAs(blob, filename);
    } else {
      toast.error("Error occurred while downloading the file.");
    }
  } catch (error) {
    console.error("File download error:", error);
  }
};

export const DOWNLOAD_FILE_GET = async (url, params = {}) => {
  try {
    const response = await api.get(url, {
      params,
      responseType: "blob",
    });
    if (response.status === 200 && response.data) {
      const fileType =
        response.headers["content-type"] || "application/octet-stream";
      const disposition = response.headers["content-disposition"];
      const filename =
        disposition?.match(/filename="?(.+?)"?$/)?.[1] || "download";

      const blob = new Blob([response.data], { type: fileType });
      FileSaver.saveAs(blob, filename);
    } else {
      toast.error("Error occurred while downloading the file.");
    }
  } catch (error) {
    console.error("File download error:", error);
    toast.error("Failed to download the file.");
    throw error;
  }
};

export const UPLOAD_FILE = async (
  url,
  file,
  { dto, onProgress, headers = {}, fileKey = "file", dtoKey = "dto" } = {}
) => {
  const formData = new FormData();

  formData.append(fileKey, file);

  if (dto !== undefined && dto !== null) {
    formData.append(dtoKey, JSON.stringify(dto));
  }
  try {
    return await api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
      onUploadProgress: (event) => {
        if (!event.total || !onProgress) return;
        const percent = Math.round((event.loaded * 100) / event.total);
        onProgress(percent);
      },
    });
  } catch (error) {
    console.error("File upload error:", error);
    throw error;
  }
};

export default api;
