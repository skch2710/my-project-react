import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { GET } from "../../utils/axiosHelper";
import { USER_PROFILE_API } from "../../utils/constants";
import { logoutUser } from "./authSlice";

/* ================== STATE ================== */
const initialState = {
  user: null,
  navigations: [],
  userPrivileges: [],
  profileLoaded: false,
  profileRequested: false,
  profile: {
    loading: false,
    error: null,
  },
};

/* ================== PROFILE ================== */
export const profile = createAsyncThunk(
  "user/profile",
  async (_, { rejectWithValue }) => {
    const response = await GET(USER_PROFILE_API);
    console.log("PROFILE RAW RESPONSE: ", response);
    if (response.statusCode === 200) return response.data;
    return rejectWithValue(response.errorMessage);
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState();
      if (user.profile.loading || user.profileLoaded) {
        return false;
      }
    },
  },
);

/* ================== SLICE ================== */
const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    resetProfileState: (state) => {
      state.profileLoaded = false;
      state.profileRequested = false;
      state.profile.loading = false;
      state.profile.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(profile.pending, (state) => {
        state.profile.loading = true;
        state.profileRequested = true;
        state.profile.error = null;
      })
      .addCase(profile.fulfilled, (state, action) => {
        const { user, navigations } = action.payload || {};

        state.user = user ?? null;
        state.userPrivileges = user?.userPrivilege ?? [];
        state.navigations = navigations ?? [];
        state.profileLoaded = true;

        state.profileLoaded = true;
        state.profile.loading = false;
        state.profile.error = null;
      })
      .addCase(profile.rejected, (state, action) => {
        state.user = null;
        state.navigations = [];
        state.userPrivileges = [];
        state.profileLoaded = false;
        state.profileRequested = true;
        state.profile.loading = false;
        state.profile.error =
          action.payload || action.error?.message || "Unable to load profile";
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(logoutUser.rejected, () => initialState);
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
export const { resetProfileState } = userSlice.actions;

/* ================== EXPORT ================== */
export default userSlice.reducer;
