import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./authSlice";
import { USER_PROFILE_API } from "../../utils/constants";
import { POST } from "../../utils/axiosHelper";

/* ================== INITIAL STATE ================== */
const initialState = {
  user: null,
  navigations: [],
  userPrivileges: [],
  profileLoaded: false,
  load: {
    loading: false,
    error: null,
  },
};

/* ================== THUNK ================== */
export const profile = createAsyncThunk(
  "user/profile",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await POST(USER_PROFILE_API, payload);

      if (response?.statusCode === 200 && response?.data) {
        return response.data;
      }

      return rejectWithValue(
        response?.errorMessage || "Unable to get the profile data"
      );
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.errorMessage ||
          error.message ||
          "Unable to get the profile data"
      );
    }
  }
);

/* ================== SLICE ================== */
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    clearUser: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.load.loading = true;
        state.load.error = null;
      })

      .addCase(profile.fulfilled, (state, action) => {
        const { user, navigations } = action.payload || {};

        state.user = user ?? null;
        state.userPrivileges = user?.userPrivilege ?? [];
        state.navigations = navigations ?? [];
        state.load.loading = false;
        state.profileLoaded = true;
      })

      .addCase(profile.rejected, (state, action) => {
        state.load.loading = false;
        state.load.error = action.payload;
        state.profileLoaded = false;
      })

      .addCase(logoutUser.fulfilled, () => initialState);
  },
});

/* ================== SELECTORS ================== */
export const selectUser = (state) => state.user.user;

export const selectUserName = (state) => {
  const user = state.user.user;
  return `${user?.firstName || ""} ${user?.lastName || ""}`.trim();
};

export const selectNavigations = (state) => state.user.navigations;
export const selectUserPrivileges = (state) => state.user.userPrivileges;
export const selectProfileLoaded = (state) => state.user.profileLoaded;

/* ================== EXPORTS ================== */
export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
