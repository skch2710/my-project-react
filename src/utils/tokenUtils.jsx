import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded token:", decoded);

    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded payload:", payload);
    const expiry = payload.exp * 1000;
    return Date.now() >= expiry;
  } catch (error) {
    console.error("Error parsing token:", error);
    return true;
  }
};

// Helper to get token from Redux store
export const getToken = () => {
  try {
    const state = store.getState();
    return state.user?.token;
  } catch {
    return null;
  }
};

// Helper to check if user is authenticated
export const isValid = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};
