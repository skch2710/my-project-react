import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser } from "./authSlice";

/* ================== INITIAL STATE ================== */
const initialState = {
  user: null,
  userId: null,
  email: null,
  firstName: null,
  lastName: null,

  navigations: [],
  userPrivileges: [],
};

/* ================== SLICE ================== */
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUser: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      /* -------- Save User Details After Login -------- */
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, navigations, userPrivileges } = action.payload;

        state.user = user;
        state.userId = user?.userId || null;
        state.email = user?.emailId || null;
        state.firstName = user?.firstName || null;
        state.lastName = user?.lastName || null;

        state.userPrivileges = userPrivileges || [];
        state.navigations = navigations || [];
      })

      /* -------- Clear On Logout -------- */
      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

/* ================== SELECTORS ================== */
export const selectUser = (state) => state.user.user;
export const selectUserName = (state) =>
  `${state.user.firstName || ""} ${state.user.lastName || ""}`.trim();

export const selectNavigations = (state) => state.user.navigations;
export const selectUserPrivileges = (state) => state.user.userPrivileges;

/* ================== EXPORTS ================== */
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;