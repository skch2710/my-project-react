// sessionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const sessionSlice = createSlice({
  name: "session",
  initialState: {
    sessionExpired: false,
  },
  reducers: {
    setSessionExpired: (state) => {
      state.sessionExpired = true;
    },
    clearSessionExpired: (state) => {
      state.sessionExpired = false;
    },
  },
});

export const { setSessionExpired, clearSessionExpired } = sessionSlice.actions;

export default sessionSlice.reducer;
