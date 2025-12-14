export const setSessionMessage = (key, message) => {
  sessionStorage.setItem(key, message);
};

export const getSessionMessage = (key) => {
  return sessionStorage.getItem(key);
};

export const clearSession = () => {
  sessionStorage.clear();
};

export const wasIdleLogout = () =>
  sessionStorage.getItem("idleLogout") === "true";
